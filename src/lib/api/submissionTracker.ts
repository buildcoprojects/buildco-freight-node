// Submission cap tracking (3 submissions per 48 hours)
const SUBMISSION_LIMIT = 3;
const HOURS_WINDOW = 48;
const SUBMISSION_KEY = 'freight_node_submissions';

export interface SubmissionRecord {
  timestamp: number;
  orderId: string;
}

// Get all current submissions
export function getSubmissions(): SubmissionRecord[] {
  if (typeof window === 'undefined') return [];

  const storedSubmissions = localStorage.getItem(SUBMISSION_KEY);
  if (!storedSubmissions) return [];

  try {
    return JSON.parse(storedSubmissions);
  } catch {
    return [];
  }
}

// Add a new submission to the tracker
export function addSubmission(orderId: string): void {
  if (typeof window === 'undefined') return;

  const submissions = getSubmissions();

  // Add the new submission
  submissions.push({
    timestamp: Date.now(),
    orderId
  });

  // Save to localStorage
  localStorage.setItem(SUBMISSION_KEY, JSON.stringify(submissions));
}

// Check if submissions are within limit
export function canSubmit(): { allowed: boolean; remainingSubmissions: number } {
  if (typeof window === 'undefined') return { allowed: true, remainingSubmissions: SUBMISSION_LIMIT };

  const submissions = getSubmissions();
  const cutoffTime = Date.now() - (HOURS_WINDOW * 60 * 60 * 1000);

  // Filter submissions within the time window
  const recentSubmissions = submissions.filter(sub => sub.timestamp >= cutoffTime);

  const submissionsLeft = Math.max(0, SUBMISSION_LIMIT - recentSubmissions.length);

  return {
    allowed: recentSubmissions.length < SUBMISSION_LIMIT,
    remainingSubmissions: submissionsLeft
  };
}

// Get formatted time until next submission window opens
export function getTimeUntilNextWindow(): string {
  if (typeof window === 'undefined') return '';

  const submissions = getSubmissions();
  if (submissions.length === 0) return '';

  // Sort by timestamp (oldest first)
  const sortedSubmissions = [...submissions].sort((a, b) => a.timestamp - b.timestamp);

  // Get the oldest submission within our window
  const oldestSubmission = sortedSubmissions[0];

  // Calculate when that submission will "expire" from our window
  const expiryTime = oldestSubmission.timestamp + (HOURS_WINDOW * 60 * 60 * 1000);
  const timeRemaining = expiryTime - Date.now();

  if (timeRemaining <= 0) return '';

  // Format the time remaining
  const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
  const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));

  return `${hours}h ${minutes}m`;
}

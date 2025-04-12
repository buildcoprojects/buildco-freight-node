'use client';

import { Suspense, useEffect, useState } from 'react';

function ConfirmationContent() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  useEffect(() => {
    // Safe client-side access to URL params
    const searchParams = new URLSearchParams(window.location.search);
    setSessionId(searchParams.get('session_id'));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Payment Confirmation</h1>
        <p className="text-lg">Session ID: {sessionId || 'Loading...'}</p>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
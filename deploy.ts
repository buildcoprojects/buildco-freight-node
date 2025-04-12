// deploy.ts
import { execSync } from "child_process";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const runCommand = (command: string) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (err) {
    console.error(`❌ Failed to execute: ${command}`);
    process.exit(1);
  }
};

const autoGenerateCommitMessage = () => {
  const now = new Date().toISOString();
  return `Auto: Commit ${now}`;
};

rl.question("Enter commit message (or leave blank for auto-generated): ", (answer) => {
  const commitMessage = answer.trim() || autoGenerateCommitMessage();
  console.log(`\n🚀 Deploying with commit message: "${commitMessage}"`);

  runCommand("git add .");
  runCommand(`git commit -m "${commitMessage}"`);
  runCommand("git push origin main");

  console.log("\n✅ Code pushed to GitHub. Netlify will auto-deploy.");
  rl.close();
});
import { copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const [, , command, challengeId] = process.argv;

if (!command || !challengeId) {
  console.error("Usage:");
  console.error("  pnpm challenge add <challenge-id>");
  console.error("  pnpm challenge submit <challenge-id>");
  process.exit(1);
}

const rootDir = process.cwd();
const challengesDir = path.join(rootDir, "challenges");
const solutionsDir = path.join(rootDir, "solutions");

const entries = await readdir(challengesDir);

const challengeDir = entries.find((entry) =>
  entry.startsWith(`${challengeId}-`),
);

if (!challengeDir) {
  console.error(`Challenge ${challengeId} not found.`);
  process.exit(1);
}

const sourceSolution = path.join(challengesDir, challengeDir, "solution.ts");

switch (command) {
  case "add": {
    const targetSolution = path.join(
      solutionsDir,
      `${challengeId}-solution.ts`,
    );

    try {
      await mkdir(solutionsDir, { recursive: true });
      await copyFile(sourceSolution, targetSolution);

      console.log(`Added solution for challenge ${challengeId}`);
      console.log(`→ ${targetSolution}`);
    } catch {
      console.error(`No solution.ts found for challenge ${challengeId}.`);
      process.exit(1);
    }

    break;
  }

  case "submit": {
    const solutionPath = path.join(solutionsDir, `${challengeId}-solution.ts`);

    console.log(`Submitting challenge ${challengeId}...`);
    console.log(`→ ${solutionPath}`);

    // TODO: send solution to backend

    break;
  }

  default:
    console.error(`Unknown command: ${command}`);
    console.error();
    console.error("Usage:");
    console.error("  pnpm challenge add <challenge-id>");
    console.error("  pnpm challenge submit <challenge-id>");
    process.exit(1);
}

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.join(scriptDir, "..");
const sourcePath = path.join(frontendDir, "..", "backend", "src", "data", "mock.ts");
const targetDir = path.join(frontendDir, "src", "data");
const targetPath = path.join(targetDir, "backend-mock.ts");

const source = await readFile(sourcePath, "utf8");
const banner = "// Auto-generated from backend/src/data/mock.ts. Do not edit here.\n";

await mkdir(targetDir, { recursive: true });
await writeFile(targetPath, `${banner}${source}`);

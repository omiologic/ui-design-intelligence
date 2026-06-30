#!/usr/bin/env node
import path from "node:path";
import { bundleSkill } from "./lib/bundle-skill.mjs";

const [skillName, installDir] = process.argv.slice(2);

if (!skillName || !installDir) {
  console.error("Usage: node scripts/install-skill.mjs <skill-name> <install-dir>");
  process.exit(1);
}

try {
  bundleSkill({
    root: process.cwd(),
    skillName,
    targetDir: path.join(installDir, skillName)
  });
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

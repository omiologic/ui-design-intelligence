#!/usr/bin/env node
/**
 * Compares SKILL.md files between skills/ (compatibility mirror) and
 * plugins/individuals/ (canonical source). Exits non-zero when any mirrored
 * skill's content diverges. Maintenance-only skills without a
 * plugins/individuals/ counterpart are skipped.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const skillsDir = path.join(root, "skills");
const individualsDir = path.join(root, "plugins", "individuals");

const entries = fs
  .readdirSync(skillsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let diverged = 0;
let checked = 0;

for (const skillName of entries) {
  const mirrorSkill = path.join(skillsDir, skillName, "SKILL.md");
  const canonicalSkill = path.join(individualsDir, skillName, "SKILL.md");

  if (!fs.existsSync(canonicalSkill)) {
    // Maintenance utility with no individuals/ counterpart — skip.
    continue;
  }

  if (!fs.existsSync(mirrorSkill)) {
    console.error(`MISSING mirror: skills/${skillName}/SKILL.md`);
    diverged++;
    continue;
  }

  const mirror = fs.readFileSync(mirrorSkill, "utf8");
  const canonical = fs.readFileSync(canonicalSkill, "utf8");

  if (mirror !== canonical) {
    console.error(
      `OUT OF SYNC: skills/${skillName}/SKILL.md differs from plugins/individuals/${skillName}/SKILL.md`
    );
    diverged++;
  } else {
    checked++;
  }
}

if (diverged > 0) {
  console.error(
    `\n${diverged} skill(s) out of sync. Update skills/ mirrors to match plugins/individuals/ and re-run.`
  );
  process.exit(1);
}

console.log(`check:skills-parity — ${checked} skill(s) in sync.`);

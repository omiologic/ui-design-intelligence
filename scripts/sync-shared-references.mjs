#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { sharedReferenceBundles, skillSourceDirs } from "./lib/bundle-skill.mjs";

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const isCheck = args.includes("--check");
const root = process.cwd();

function hashFile(p) {
  return crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
}

const outOfSync = [];
let synced = 0;
let current = 0;
let sourceErrors = 0;

for (const bundle of Object.values(sharedReferenceBundles)) {
  for (const skillName of bundle.skills) {
    for (const skillDir of skillSourceDirs(root, skillName)) {
      const sharedTarget = path.join(skillDir, "references", "_shared");

      for (const [sourceRel, targetRel] of bundle.files) {
        const src = path.join(root, sourceRel);
        const dst = path.join(sharedTarget, targetRel);
        const dstRel = path.relative(root, dst);

        if (!fs.existsSync(src)) {
          console.error(`[ERROR] Missing canonical source: ${sourceRel}`);
          sourceErrors++;
          continue;
        }

        const exists = fs.existsSync(dst);
        const upToDate = exists && hashFile(src) === hashFile(dst);

        if (upToDate) {
          current++;
          continue;
        }

        if (isCheck || isDryRun) {
          const reason = exists ? "stale" : "missing";
          const tag = isCheck ? "[OUT OF SYNC]" : "[DRY RUN]";
          console.log(`${tag} ${dstRel} (${reason})`);
          outOfSync.push(dstRel);
        } else {
          fs.mkdirSync(path.dirname(dst), { recursive: true });
          fs.copyFileSync(src, dst);
          console.log(`[SYNCED] ${dstRel}`);
          synced++;
        }
      }
    }
  }
}

if (isCheck) {
  if (outOfSync.length > 0 || sourceErrors > 0) {
    console.error(`\n${outOfSync.length} _shared file(s) out of sync. Run: npm run sync:shared-references`);
    process.exit(1);
  }
  console.log(`All _shared references are current (${current} files checked).`);
} else if (isDryRun) {
  const label = outOfSync.length === 1 ? "file" : "files";
  console.log(`\nDry run: ${outOfSync.length} ${label} would change, ${current} already current.`);
} else {
  if (sourceErrors > 0) {
    process.exit(1);
  }
  console.log(`Sync complete: ${synced} updated, ${current} already current.`);
}

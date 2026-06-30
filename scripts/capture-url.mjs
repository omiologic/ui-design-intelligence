#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

function usage() {
  return `Usage: node scripts/capture-url.mjs --url <url> [options]

Creates a deterministic capture metadata envelope for externally supplied page evidence.
This Sprint 001 helper does not fetch pages, launch a browser, or take screenshots.

Options:
  --url <url>             Page URL to identify the capture source. Required.
  --title <title>         Optional page title or label.
  --captured-at <date>    Optional capture date, usually YYYY-MM-DD.
  --screenshot <path>     Optional externally captured screenshot path.
  --dom <path>            Optional externally captured DOM/HTML path.
  --notes <path>          Optional externally captured notes path.
  --out <path>            Write JSON to a file instead of stdout.
  --check                 Validate arguments and exit without output.
  --help                  Show this help text.
`;
}

function fail(message) {
  console.error(`capture-url: ${message}`);
  console.error("");
  console.error(usage());
  process.exit(1);
}

function readOption(name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) fail(`${name} requires a value`);
  return value;
}

if (args.includes("--help")) {
  console.log(usage());
  process.exit(0);
}

const allowed = new Set([
  "--url",
  "--title",
  "--captured-at",
  "--screenshot",
  "--dom",
  "--notes",
  "--out",
  "--check",
  "--help"
]);

for (let index = 0; index < args.length; index += 1) {
  const item = args[index];
  if (!item.startsWith("--")) continue;
  if (!allowed.has(item)) fail(`unknown option ${item}`);
  if (!["--check", "--help"].includes(item)) index += 1;
}

const urlValue = readOption("--url");
if (!urlValue) fail("--url is required");

let parsedUrl;
try {
  parsedUrl = new URL(urlValue);
} catch {
  fail(`invalid URL: ${urlValue}`);
}

if (!["http:", "https:"].includes(parsedUrl.protocol)) {
  fail(`unsupported URL protocol: ${parsedUrl.protocol}`);
}

const capture = {
  captureMode: "external-evidence",
  captureStatus: "metadata-only",
  url: parsedUrl.href,
  title: readOption("--title"),
  capturedAt: readOption("--captured-at"),
  evidence: {
    screenshot: readOption("--screenshot"),
    dom: readOption("--dom"),
    notes: readOption("--notes")
  },
  limitations: [
    "Sprint 001 capture-url.mjs does not fetch pages, launch a browser, or create screenshots.",
    "Provide screenshots, DOM exports, notes, or direct observations from an external capture workflow."
  ]
};

if (args.includes("--check")) process.exit(0);

const output = `${JSON.stringify(capture, null, 2)}\n`;
const outFile = readOption("--out");

if (outFile) {
  fs.mkdirSync(path.dirname(path.resolve(outFile)), { recursive: true });
  fs.writeFileSync(outFile, output);
} else {
  process.stdout.write(output);
}

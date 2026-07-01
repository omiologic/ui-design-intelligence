#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { productSkills } from "./lib/bundle-skill.mjs";

const root = process.cwd();
const skillsDir = path.join(root, "skills");
const individualsDir = path.join(root, "plugins", "individuals");
const errors = [];
const names = new Map();
const productSkillSet = new Set(productSkills);
const requestedSkills = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
const requestedSkillSet = new Set(requestedSkills);

function fail(message) {
  errors.push(message);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function parseFrontmatter(text, file) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    fail(`${file}: missing YAML frontmatter`);
    return {};
  }

  const data = {};
  for (const line of match[1].split("\n")) {
    const item = line.match(/^([A-Za-z0-9_-]+):\s*(.+?)\s*$/);
    if (item) data[item[1]] = item[2].replace(/^["']|["']$/g, "");
  }
  return data;
}

function referenceLines(text) {
  const lines = text.split("\n");
  const refs = [];
  let inReferences = false;

  for (const line of lines) {
    if (/^##\s+References\s*$/.test(line)) {
      inReferences = true;
      continue;
    }
    if (inReferences && /^##\s+/.test(line)) break;
    if (!inReferences) continue;

    const match = line.match(/`([^`]+)`/);
    if (match) refs.push(match[1]);
  }

  return refs;
}

function sectionHeadings(text) {
  return new Set(
    text
      .split("\n")
      .map((line) => line.match(/^##\s+(.+?)\s*$/))
      .filter(Boolean)
      .map((match) => match[1])
  );
}

function hasAnySection(headings, sections) {
  return sections.some((section) => headings.has(section));
}

function walkFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkFiles(item);
    return [item];
  });
}

function isCompatibilityDuplicate(skillName, existingPath, nextPath) {
  const skillPath = `skills/${skillName}/SKILL.md`;
  const individualPath = `plugins/individuals/${skillName}/SKILL.md`;
  return [existingPath, nextPath].sort().join("|") === [skillPath, individualPath].sort().join("|");
}

function checkSkillBodySections(text, relativeSkillFile) {
  const headings = sectionHeadings(text);
  const requiredSections = ["Purpose", "References", "Rules", "Anti-Patterns", "Hand-Offs"];
  const deprecatedSections = [
    "Best-Practice Checks",
    "Evidence Rules",
    "Inline Examples",
    "Cross-Skill Example",
    "Decision Heuristics",
    "Worked Example",
    "Hand-Off"
  ];

  for (const section of requiredSections) {
    if (!headings.has(section)) {
      fail(`${relativeSkillFile}: missing required SKILL.md section "## ${section}"`);
    }
  }

  for (const section of deprecatedSections) {
    if (headings.has(section)) {
      fail(`${relativeSkillFile}: deprecated SKILL.md section "## ${section}" should be folded into the canonical taxonomy`);
    }
  }

  const requiredGroups = [
    {
      label: "decision section",
      sections: ["Decision Criteria", "Evidence Discipline"]
    },
    {
      label: "workflow section",
      sections: ["Workflow", "Method"]
    }
  ];

  requiredGroups.push({
    label: "inline example section",
    sections: ["Inline Example"]
  });
  requiredSections.push("Philosophy", "Boundary");

  for (const section of ["Philosophy", "Boundary"]) {
    if (!headings.has(section)) {
      fail(`${relativeSkillFile}: missing required canonical SKILL.md section "## ${section}"`);
    }
  }

  for (const group of requiredGroups) {
    if (!hasAnySection(headings, group.sections)) {
      fail(
        `${relativeSkillFile}: missing required ${group.label}; expected one of ${group.sections
          .map((section) => `"## ${section}"`)
          .join(", ")}`
      );
    }
  }
}

function validateSkillRoot(baseDir, label, options = {}) {
  if (!fs.existsSync(baseDir)) {
    if (options.required) fail(`${label}/: directory does not exist`);
    return;
  }

  const skillDirs = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const dirName of skillDirs) {
    if (dirName.startsWith("_")) continue;
    if (requestedSkillSet.size > 0 && !requestedSkillSet.has(dirName)) continue;

    const skillDir = path.join(baseDir, dirName);
    const skillFile = path.join(skillDir, "SKILL.md");
    const relativeSkillFile = path.relative(root, skillFile);

    if (!fs.existsSync(skillFile)) {
      fail(`${label}/${dirName}: missing SKILL.md`);
      continue;
    }

    const text = read(skillFile);
    const frontmatter = parseFrontmatter(text, relativeSkillFile);
    const skillName = frontmatter.name;
    const description = frontmatter.description;

    if (!skillName) {
      fail(`${relativeSkillFile}: missing frontmatter name`);
    } else {
      if (skillName !== dirName) {
        fail(`${relativeSkillFile}: name "${skillName}" must match directory "${dirName}"`);
      }
      const existingPath = names.get(skillName);
      if (existingPath && !isCompatibilityDuplicate(skillName, existingPath, relativeSkillFile)) {
        fail(`${relativeSkillFile}: duplicate skill name "${skillName}" also used by ${existingPath}`);
      }
      if (!existingPath) names.set(skillName, relativeSkillFile);
    }

    if (!description) {
      fail(`${relativeSkillFile}: missing frontmatter description`);
    } else if (description.length < 40 || /\b(todo|tbd)\b/i.test(description)) {
      fail(`${relativeSkillFile}: description is too vague or unfinished`);
    }

    for (const ref of referenceLines(text)) {
      if (/^(https?:|app:|file:)/.test(ref)) continue;
      const absoluteRef = path.resolve(skillDir, ref);
      if (!fs.existsSync(absoluteRef)) {
        fail(`${relativeSkillFile}: referenced file does not exist: ${ref}`);
      }
    }

    checkSkillBodySections(text, relativeSkillFile);
  }
}

validateSkillRoot(skillsDir, "skills", { required: true });
validateSkillRoot(individualsDir, "plugins/individuals", { requireJudgment: true });

if (requestedSkillSet.size === 0) {
  for (const skillName of productSkills) {
    const skillFile = path.join(individualsDir, skillName, "SKILL.md");
    if (!fs.existsSync(skillFile)) {
      fail(`plugins/individuals/${skillName}: product skill individual is missing SKILL.md`);
    }
  }
} else {
  for (const skillName of requestedSkillSet) {
    if (!names.has(skillName)) {
      fail(`requested skill does not exist: ${skillName}`);
    }
  }
}

if (errors.length) {
  console.error("Skill validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Skill validation passed for ${names.size} ${requestedSkillSet.size > 0 ? "targeted " : ""}skills.`
);

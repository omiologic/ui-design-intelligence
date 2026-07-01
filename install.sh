#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUNDLE_NAME="${UI_PLUGIN_BUNDLE:-ui-blueprint-skills}"
DRY_RUN=0

if [[ " $* " == *" --dry-run "* ]]; then
  DRY_RUN=1
fi

if [ -n "${UI_PLUGIN_TARGET:-}" ]; then
  PLUGIN_TARGET="${UI_PLUGIN_TARGET}"
  INSTALL_DIR="${PLUGIN_TARGET}/skills"
elif [ -n "${UI_BLUEPRINT_SKILLS_DIR:-}" ]; then
  INSTALL_DIR="${UI_BLUEPRINT_SKILLS_DIR}"
  if [ "${DRY_RUN}" -eq 1 ] && [ ! -d "$(dirname "${INSTALL_DIR}")" ]; then
    PLUGIN_TARGET="$(dirname "${INSTALL_DIR}")"
  else
    mkdir -p "$(dirname "${INSTALL_DIR}")"
    PLUGIN_TARGET="$(cd "$(dirname "${INSTALL_DIR}")" && pwd)"
  fi
else
  PLUGIN_TARGET="${HOME}/.claude"
  INSTALL_DIR="${PLUGIN_TARGET}/skills"
fi

if [ ! -f "${ROOT_DIR}/plugins/bundles/${BUNDLE_NAME}/plugin.json" ]; then
  echo "Error: bundle manifest not found: plugins/bundles/${BUNDLE_NAME}/plugin.json" >&2
  exit 1
fi

if [ "${DRY_RUN}" -eq 0 ]; then
  mkdir -p "$INSTALL_DIR"
fi

echo "Installing ${BUNDLE_NAME}"
echo "Bundle: ${BUNDLE_NAME}"
echo "Plugin target: ${PLUGIN_TARGET}"
echo "Target: ${INSTALL_DIR}"
echo ""

node "${ROOT_DIR}/scripts/install-bundle.mjs" install "$BUNDLE_NAME" "$PLUGIN_TARGET" "$INSTALL_DIR" "$@"

if [ "${DRY_RUN}" -eq 1 ]; then
  echo ""
  echo "Dry run completed for ${BUNDLE_NAME}. No files written."
  exit 0
else
  node "${ROOT_DIR}/scripts/verify-installed-references.mjs" "$INSTALL_DIR"
fi

echo ""
echo "Installed ${BUNDLE_NAME}."
echo "Restart or reload your agent environment so it can discover the installed skills."
echo ""
echo "Install a different bundle with:"
echo "  UI_PLUGIN_BUNDLE=ui-study-skills ./install.sh"
echo "Override the plugin target with:"
echo "  UI_PLUGIN_TARGET=/path/to/.claude ./install.sh"
echo "Compatibility target override:"
echo "  UI_BLUEPRINT_SKILLS_DIR=/path/to/skills ./install.sh"
echo "Check an existing project without writing:"
echo "  UI_PLUGIN_TARGET=/path/to/.claude ./install.sh --dry-run"

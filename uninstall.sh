#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUNDLE_NAME="${UI_PLUGIN_BUNDLE:-ui-blueprint-skills}"

if [ -n "${UI_PLUGIN_TARGET:-}" ]; then
  PLUGIN_TARGET="${UI_PLUGIN_TARGET}"
  INSTALL_DIR="${PLUGIN_TARGET}/skills"
elif [ -n "${UI_BLUEPRINT_SKILLS_DIR:-}" ]; then
  INSTALL_DIR="${UI_BLUEPRINT_SKILLS_DIR}"
  if [ -d "$(dirname "${INSTALL_DIR}")" ]; then
    PLUGIN_TARGET="$(cd "$(dirname "${INSTALL_DIR}")" && pwd)"
  else
    PLUGIN_TARGET="$(dirname "${INSTALL_DIR}")"
  fi
else
  PLUGIN_TARGET="${HOME}/.claude"
  INSTALL_DIR="${PLUGIN_TARGET}/skills"
fi

if [ ! -f "${ROOT_DIR}/plugins/bundles/${BUNDLE_NAME}/plugin.json" ]; then
  echo "Error: bundle manifest not found: plugins/bundles/${BUNDLE_NAME}/plugin.json" >&2
  exit 1
fi

if [ ! -d "$PLUGIN_TARGET" ] && [ ! -d "$INSTALL_DIR" ]; then
  echo "Nothing to uninstall: target directory does not exist: ${PLUGIN_TARGET}"
  exit 0
fi

echo "Uninstalling ${BUNDLE_NAME}"
echo "Bundle: ${BUNDLE_NAME}"
echo "Plugin target: ${PLUGIN_TARGET}"
echo "Target: ${INSTALL_DIR}"
echo ""

node "${ROOT_DIR}/scripts/install-bundle.mjs" uninstall "$BUNDLE_NAME" "$PLUGIN_TARGET" "$INSTALL_DIR"

echo ""
echo "Removed ${BUNDLE_NAME} files."
echo "Uninstall a different bundle with:"
echo "  UI_PLUGIN_BUNDLE=ui-study-skills ./uninstall.sh"
echo "Override the plugin target with:"
echo "  UI_PLUGIN_TARGET=/path/to/.claude ./uninstall.sh"
echo "Compatibility target override:"
echo "  UI_BLUEPRINT_SKILLS_DIR=/path/to/skills ./uninstall.sh"

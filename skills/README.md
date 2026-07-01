> **[DEPRECATED — use `plugins/individuals/`]**
> This directory is a read-only compatibility mirror. Do not edit skills here.
> Make all changes in `plugins/individuals/{skill-name}` and sync back with
> `npm run sync:shared-references`. See the `## Deprecation` section in
> `PLAN.md` for the retirement timeline (target: `1.0.0`).

# skills/

Compatibility mirror of the eight blueprint product skills. These files exist
so that existing `install.sh`, `uninstall.sh`, and `npm run package` consumers
keep working during the transition to bundle install paths.

The canonical source for every skill here is its counterpart under
`plugins/individuals/`. Run `npm run check:skills-parity` to verify the two
trees are in sync.

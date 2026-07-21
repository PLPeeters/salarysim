---
name: sync-with-latest-rules
description: Refresh Belgian payroll, withholding-tax, and company-car rules in codebases that model Belgian salary calculations. Use when Codex needs to inspect official Belgian sources, compare them with existing tax data, add a new revenue year, update professional withholding or ONSS-derived rules, or adjust company-car benefit and contribution parameters.
---

# Belgian Payroll Rules

## Overview

Use this skill to refresh a Belgian payroll simulator from official sources and make the smallest safe code update. Prefer source verification over memory. Do not invent tax values, thresholds, or company-car rates when the official publication for the target year is missing.

## Workflow

1. Read the repository guidance and continuity file first. Inspect `git status` before editing and avoid overwriting unrelated user changes.
2. Restrict web research to official sources listed in `references/official-sources.md`. Prefer the exact yearly publication over summaries or third-party explainers. Before concluding that a new withholding year is missing, re-open the exact SPF Finances calculation page from the official-source map and verify the latest visible year section there.
   - For ONSS DMFA pages, do not rely on `latest` alone. Inspect the exact quarter pages for the target year and the latest/intermediate instructions, then extract every effective-date table in chronological order. A quarterly page can contain multiple intra-quarter periods, for example separate January-February and March schedules, and those periods must be preserved instead of overwritten by later schedules.
3. Inventory the code paths that encode Belgian payroll rules. In this repository, inspect the year data files under `src/app/services/data/*.ts`, the calculator logic in `src/app/services/tax-calculator.service.ts`, the supported-year wiring in `src/app/components/main/**`, and any affected translations in `src/assets/i18n/*.json`.
4. Compare the official rules against the current code. Separate findings into: professional withholding changes, social-security or employment-bonus changes, company-car taxable-benefit changes, and company-car solidarity-contribution changes.
5. Change only what the official source proves. If a current-year official source is unavailable, keep the existing code unchanged for that topic and report the gap explicitly as `UNCONFIRMED`.
6. If the SPF landing page shows the new year, follow the downstream MyMinfin or Fisconet record through to the actual attachment payload before declaring a retrieval failure. That includes one-click-deeper PDF links, download endpoints, or embedded base64 document payloads exposed by the public document API. If the landing page shows the year but only the attachment retrieval is blocked, report that distinction precisely. Do not say the yearly instructions do not exist unless the landing page itself lacks the year.
7. When a new revenue year is required, update every related year list, tests, UI selector, documentation snippet, and explanatory copy in the same change. Do not stop at wiring the new year into selectors: add year-specific regression coverage that proves the new year is supported end to end. In this repository that usually means adding or updating `src/app/services/data/<year>-inputs-to-net.ts` fixture coverage when feasible, plus focused calculator tests for the year-specific rule changes.
8. Prefer an explicit year file over a multi-year inheritance chain when the year data acts as an auditable rule snapshot. Small shared helpers are fine, but do not hide a payroll year behind several prior-year overlays unless the user explicitly asks for that tradeoff.
9. After source edits, update affected docs and run the repository verification commands. In this repository, run `npm run build` and `npm run test-headless` unless the environment blocks them.

## Company-Car Rule Selection

Treat company cars as two separate rule families.

- For the taxable benefit in kind, prefer SPF Finances material. Use the official company-car page and, when published, the yearly FAQ PDF for voitures de societe because it usually contains the reference CO2 values, catalog-value treatment, and edge cases.
- For the employer solidarity contribution, use the ONSS DMFA `companycar.html` instructions page because it carries the authoritative coefficient and minimum-contribution schedule.
- Do not mix the SPF taxable-benefit formula with the ONSS solidarity-contribution formula. Update each only if the repo actually models it.

## Update Rules

When the official sources differ from the code:

- Update the year-specific constants first.
- Update calculator logic only if the formula itself changed, not just the yearly inputs.
- Add or adjust focused unit tests that prove the changed rule.
- If you introduced a new revenue year, add explicit test coverage for that year instead of relying only on neighboring-year tests or generic selector wiring.
- Keep the final year payload easy to audit against the official publication; if you used temporary inheritance while exploring, collapse it before finishing unless the user asked to keep it.
- Update user-facing copy if a visible label, warning, or supported-year message changed.

When the official sources match the code:

- Do not create churn.
- Report that no code change was required and cite the official sources checked.

## Output Expectations

Report:

- which official sources were checked,
- which repo files were inspected,
- what changed or why no change was needed,
- what remains `UNCONFIRMED`,
- which verification commands ran and their outcomes.

## Reference

Read `references/official-sources.md` before browsing. It contains the official-source map, company-car source preference, and the repository file checklist.

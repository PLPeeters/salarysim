# AGENTS.md

Repository-specific guidance for AI coding agents working in `SalarySim`.

## Repo snapshot

This repository is a single Angular CLI application named `SalarySim`.

- Package manager: `npm` via `package-lock.json`
- Angular version: 19.x
- App project name: `SalarySim`
- Output directory: `dist/salary-sim-angular`
- Primary workflow: local Angular development plus GitHub Pages deployment

The most important codepaths are:

- `src/app/components/main/**`
  Main UI, charts, responsive behavior, and form orchestration.
- `src/app/services/tax-calculator.service.ts`
  Core salary and tax computation logic.
- `src/app/services/data/*.ts`
  Year-specific Belgian tax data and thresholds.
- `src/assets/i18n/*.json`
  User-facing translations.
- `.github/workflows/main.yaml`
  CI and deploy behavior.

## Startup checklist

On every task:

1. Inspect current git status before editing.
2. Prefer read-only inspection first, then make the smallest safe change.

## Project-specific development guidance

### Architecture

This is a standalone-component Angular application, not an NgModule-heavy legacy app.

- Bootstrap entrypoint: `src/main.ts`
- App-level providers and Transloco setup: `src/app/app.config.ts`
- Router: `src/app/app.routes.ts`
- Main page component: `src/app/components/main/main.component.ts`
- Input form logic: `src/app/components/main/form/form.component.ts`
- Withholding tax visualization: `src/app/components/main/withholding-tax-breakdown/**`

### Domain logic

The tax calculator is the highest-risk part of the codebase.

- Treat `src/app/services/tax-calculator.service.ts` and `src/app/services/data/*.ts` as finance-critical code.
- Preserve numeric precision patterns using `decimal.js`.
- When adding a new revenue year, update all related year lists, tests, UI selectors, and any translation or explanatory text affected by the new rules.
- Do not “simplify” formulas without proving equivalence through tests.

### i18n

Translations are handled with Transloco.

- Translation files live in `src/assets/i18n/en.json`, `fr.json`, and `nl.json`.
- If you add or rename a translation key, update every locale in the same change.
- Locale-sensitive formatting is centralized in `src/app/services/formatting.service.ts`.

### UI and layout

Angular Material, CDK, `ngx-charts`, and `@angular/flex-layout` are all in active use.

- Preserve the existing UI patterns unless the task is explicitly a redesign.
- Do not expand use of `@angular/flex-layout` without a good reason.
  It is deprecated on npm and its upstream GitHub repository was archived on 2025-01-06.
- Prefer Angular CDK or plain CSS/SCSS for new layout work where practical.

### Testing posture

The repo currently has unit tests, but no lint script and no e2e suite.

- Existing specs live alongside app code under `src/app/**/*.spec.ts`.
- Prefer adding or updating focused unit tests when touching calculator logic, validators, formatting, or standalone components.
- For chart/UI changes, verify both behavior and rendering assumptions as far as unit tests reasonably allow.

## Verification commands

Use these commands from the repository root:

```bash
npm run build
npm run test-headless
```

Notes:

- `npm run test-headless` matches CI best.
- `npm test` runs Karma in watch mode with coverage and is more useful for local iteration than for final verification.
- There is no `npm run lint` script at the time of writing; do not claim linting was run unless you added such a script and executed it.

## Deployment and CI

Deployment behavior matters because pushes to `main` trigger publish steps.

- CI file: `.github/workflows/main.yaml`
- Current workflow on pushes to `main`:
  - checks out code,
  - uses Node 22,
  - runs `npm install`,
  - runs `npm run test-headless`,
  - runs `npm run deploy`

Do not change deploy behavior casually. Any change touching `angular.json`, deploy scripts, `baseHref`, or GitHub Pages assumptions needs explicit scrutiny.

## Editing rules for this repo

- Make the smallest safe change that solves the problem.
- Preserve existing Angular standalone-component patterns.
- Avoid unrelated formatting churn.
- Do not edit generated output under `dist/` or coverage artifacts under `coverage/`.
- Never overwrite or revert unrelated user changes in a dirty worktree.

## Dependencies

When a request involves commodity functionality, consider a library before custom code, but qualify the choice.

For this repo specifically:

- Be conservative about adding UI or chart dependencies.
- Be especially cautious around tax, money, or date logic dependencies.

## Documentation expectations

After source changes, update any affected:

- user-facing docs in `README.md`,
- developer guidance in this `AGENTS.md`,
- translation files,
- examples or explanatory copy in the UI.

Documentation-only changes do not require a build unless the user asks for verification, but source code changes should be verified with the standard commands above.

## Definition of done

A task is done when:

1. The requested change is implemented or answered.
2. Impact is explained clearly.
3. Any affected docs and translations are updated.
4. Verification is provided with exact commands run, or the gap is stated clearly.

## Current known risks

These are important until proven otherwise:

1. `@angular/flex-layout` is deprecated and archived upstream.
2. The tax calculator service is large and tightly coupled to year-specific data, so small formula changes can have wide behavioral effects.
3. There is no lint script, so build and headless tests are the primary automated safety net.

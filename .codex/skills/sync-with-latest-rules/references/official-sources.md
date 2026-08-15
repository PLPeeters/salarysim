# Official Sources

Use official Belgian sources only unless the user explicitly asks for broader research.

## Primary sources

### Guaranteed average minimum monthly income (RMMMG/GGMMI)

- National Labour Council CCT/CAO amounts index:
  `https://cnt-nar.be/fr/documents/montants-des-cct`
- Follow the newest dated `TABLEAUX DES MONTANTS DES CCT` PDF and use the CCT/CAO no. 43 table. It gives the authoritative effective-date history, including indexations and structural increases.
- Cross-check the concept and scope on the FPS Employment salary page:
  `https://emploi.belgique.be/fr/themes/remuneration/salaire`
- The RMMMG/GGMMI is an average guaranteed monthly income, not strictly a monthly base wage: qualifying annual payments can count toward it. Use the amount for workers aged 18 and over; do not use student scales or sector-specific minima.
- Inspect every effective date in the target year. Store all effective periods in the repository's `minimumSalary` array, including the amount in force on 1 January, and update focused month-selection and graph-boundary tests.

### Professional withholding

- SPF Finances calculation landing page:
  `https://finances.belgium.be/fr/entreprises/personnel_et_remuneration/precompte_professionnel/calcul`
- Re-open this exact `Entreprises > Personnel et rémunération > Précompte professionnel > Calcul` page before declaring the current year unavailable. It is the canonical year index for the yearly rules, formula key, and simulator links.
- Follow linked circulars, annexes, PDFs, and yearly notices from that page when they exist. Prefer the document for the exact target year over archive copies.
- If the year link lands on MyMinfin or Fisconet, continue through to the attached PDF or document payload. Check for public document endpoints, explicit PDF links, or embedded base64 PDF content before concluding that the yearly constants are not retrievable.
- If the landing page exposes the target year but the downstream attachment or document payload is not readable in the current environment, record that as a retrieval limitation, not as an absent publication.

### ONSS employer instructions

- DMFA latest instructions root:
  `https://www.socialsecurity.be/employer/instructions/dmfa/fr/latest`
- Use the relevant sections for work bonus, reductions, and contribution changes that affect this repository.

### Company cars

Split the research by rule family.

1. Taxable benefit in kind
- Preferred source family: SPF Finances official company-car publications.
- Start from the SPF Finances website and look for the current yearly FAQ PDF or notice for `voitures de societe`.
- In this repository, the existing 2024 data already references an SPF FAQ PDF. Use the same level of source authority for later years when available.
- If the current year's FAQ or equivalent official yearly publication is not yet available, treat new values as `UNCONFIRMED` and avoid changing the code from inference alone.

2. Employer solidarity contribution
- Preferred source: ONSS DMFA latest company-car page:
  `https://www.socialsecurity.be/employer/instructions/dmfa/fr/latest/instructions/special_contributions/companycar.html`
- Use this source for coefficient ramps, minimum indexed amounts, and date-based applicability tied to purchase, lease, or order timing.

## Repository checklist for SalarySimAngular

Inspect these paths when refreshing Belgian payroll rules:

- `src/app/services/data/2024.ts`
- `src/app/services/data/2025.ts`
- `src/app/services/data/2026.ts`
- `src/app/services/data/interfaces.ts`
- `src/app/services/tax-calculator.service.ts`
- `src/app/services/tax-calculator.service.spec.ts`
- `src/app/components/main/form/form.component.ts`
- `src/app/components/main/form/form.component.spec.ts`
- `src/app/components/main/main.component.ts`
- `src/app/components/main/main.component.spec.ts`
- `src/assets/i18n/en.json`
- `src/assets/i18n/fr.json`
- `src/assets/i18n/nl.json`
- `README.md`
- `AGENTS.md`

## Comparison checklist

For each target year, verify at minimum:

- the CCT/CAO no. 43 RMMMG/GGMMI amount and every effective date during the year;
- professional withholding thresholds, exemptions, reductions, and family-status impacts;
- work-bonus or ONSS-linked thresholds if the repo models them;
- company-car reference CO2 values, default emissions, and formula bounds for taxable benefit;
- company-car solidarity-contribution coefficients, minimums, and date cutovers if the repo models them;
- supported-year wiring in UI selectors and tests.

## Safety rules

- Do not trust prior-year values as a proxy for a new year.
- Do not use blogs, payroll vendors, or forum posts as the deciding source.
- Do not overwrite unrelated user changes in a dirty worktree.
- If the official sources disagree, stop and report the conflict with links and exact publication names.

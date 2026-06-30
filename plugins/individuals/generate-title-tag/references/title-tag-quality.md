# Title Tag Quality

Use this reference to judge whether a title tag is specific, supported, and
useful in search results, browser tabs, and shared previews.

## Quality Criteria

- The title names the page-specific topic before generic brand or category text.
- The title sets an accurate pre-click promise that visible page content can
  keep.
- The title distinguishes the page from related pages in the same site section.
- The strongest supported qualifier appears early: product, service, location,
  audience, format, use case, or action.
- Brand appears when it clarifies trust, ownership, or navigation, usually after
  the page topic.
- The core meaning remains clear if the title is truncated.

## Length Guidance

- Aim for roughly 50 to 60 characters when the title can stay natural and
  specific.
- Shorter is acceptable when the page topic and brand are clear.
- Longer is acceptable only when the extra words add supported differentiation.
- Put the page-specific promise first so truncation does not remove the main
  topic.
- Do not pad titles to hit a target length.

## Evidence Checklist

- Page type: homepage, service, product, article, category, location, support,
  pricing, contact, or landing page.
- Visible H1, section headings, summary, primary CTA, proof, product or service
  names, location, audience, and brand.
- Existing title, neighboring page titles, and any supplied search intent.
- Page-specific differentiators that are visible or explicitly supplied.

## Anti-Patterns

- Vague title: "Home", "Services", "Products", or "Welcome".
- Duplicate title: distinct pages use the same title or differ only by brand.
- Keyword stuffing: repeated query variants replace a readable title.
- Unsupported modifier: "best", "cheap", "same-day", "official", "near me", or
  a location appears without page evidence.
- Back-loaded meaning: brand, category, or filler consumes the beginning while
  the unique page topic appears late.
- Overlong promise: the title tries to include every audience, feature, service,
  and location.
- Mismatched page type: an article title sounds like a product page, or a
  service page title sounds like a generic category.

## Patterns By Page Type

| Page Type | Pattern | Notes |
| --- | --- | --- |
| Homepage | `Primary offer or category | Brand` | Use brand first only when the brand itself is the search target. |
| Service | `Specific Service in Location | Brand` | Include location only when the page supports local relevance. |
| Product | `Product Name - Category | Brand` | Add a differentiator only when visible on the page. |
| Category | `Category Name for Audience or Use Case | Brand` | Avoid stuffing every subcategory into the title. |
| Article | `Article Topic or How-To Outcome | Brand` | Match the actual angle and avoid sales-page phrasing. |
| Support | `Task or Problem Help | Brand Support` | Lead with the task users need to complete. |
| Contact | `Contact Brand or Location | Brand` | Include booking, quote, or support only when the page provides it. |

## Command Decision

A future deterministic command could check character length, duplicate titles
across fixtures, missing brand delimiters, or banned generic phrases. This skill
does not need a command or subagent for normal generation because title quality
depends on page intent and evidence judgment.

## Worked Examples

Supported service page:

- Evidence: H1 says "Emergency Dental Care in Austin", page has same-week
  appointments, insurance support, and Example Dental branding.
- Output: `Emergency Dental Care in Austin | Example Dental`

Unsupported modifier:

- Evidence: page says "Family Dentistry" and lists services, but does not claim
  emergency care, affordability, or same-day appointments.
- Avoid: `Affordable Emergency Dentist Near Me | Example Dental`
- Output: `Family Dentistry Services | Example Dental`

Duplicate page group:

- Evidence: three location pages are titled `Dental Services | Example Dental`.
- Fix: include the supported location or page-specific service focus, such as
  `Dental Services in Austin | Example Dental`.

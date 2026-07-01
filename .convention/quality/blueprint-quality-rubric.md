# Blueprint Quality Golden Set Rubric

This rubric measures whether a generated wireframe blueprint is directionally
good, not only whether it is schema-valid. The first version is a
checklist-based foundation: it records expected signals for human review and
validates that each golden-set case is structured enough to compare later
outputs against.

## Rubric

Score each criterion from `0` to `2`.

| Criterion | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Journey clarity | The page/screen order is confusing or generic. | The order is understandable but weakly prioritized. | The order follows the user's decision or task path. |
| Single primary action | Primary action is missing or competes with peers. | A primary action exists but cadence or hierarchy is weak. | One primary action is clear per decision or task region. |
| Proof placement | Proof is missing or appears after commitment. | Proof exists but is detached from the decision it supports. | Proof appears before or beside the decision it supports. |
| State coverage | States, errors, empty states, or recovery are missing where needed. | Some state coverage exists, with gaps. | Critical states and recovery paths are represented. |
| Register fit | Structure uses the wrong register for the brief. | Register mostly fits but includes mismatched sections or density. | Marketing, product, or utility structure matches the brief. |
| Landmark coverage | Page landmarks or labels are missing. | Landmarks exist but are incomplete or unclear. | Header, main, footer, navigation, and overlays have clear structure. |
| Responsive priority | Mobile/tablet priority is missing or generic. | Responsive notes exist but do not prioritize the key user path. | Responsive notes preserve the most important content and controls. |
| Anti-pattern absence | Known anti-patterns are present. | Minor risks exist but do not break the path. | No known deterministic or rubric-level anti-patterns are evident. |

## Quality Bands

- `0-9`: weak; schema validity is not enough to trust the output.
- `10-13`: usable draft; requires design review before implementation.
- `14-16`: strong reference; suitable as a golden-set expectation.

## Current Evaluation Mode

The initial golden set is checklist-based and deterministic only at the fixture
integrity layer. The validator confirms that each case declares the required
criteria, expected signals, scoring bands, and a schema-valid reference
blueprint. It does not claim to grade a new generated blueprint automatically.

Later work can add deterministic checks for signals that are reliably
machine-checkable, then optionally add LLM-assisted grading for the parts that
remain judgment-led.

## Limits

- The rubric cannot determine visual elegance, copy quality, brand taste, or
  emotional resonance without design judgment.
- A blueprint can satisfy every schema rule and still fail this rubric if the
  journey, proof, register, or responsive priority is weak.
- Golden-set fixtures are positive reference cases. They do not replace
  negative fixtures under `tests/invalid-*`, which exist to prove validator
  failures.

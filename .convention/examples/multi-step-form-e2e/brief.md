# Multi-Step Form Brief

## Product

ClaimStart intake flow for a home-insurance claim after water damage.

## Audience

Policyholders filing a claim from a phone or laptop while collecting incident
details, photos, and contact information.

## Primary Goal

Help the policyholder complete a claim intake form with clear validation,
review, submission success, and save/recovery behavior.

## Success Action

The user submits the reviewed claim and receives a confirmation state.

## Required Content

- Step 1: policy and contact details.
- Step 2: incident details and photo upload guidance.
- Step 3: review entered information before submission.
- Success confirmation with claim reference.
- Error and recovery behavior for missing required fields, upload failure, and
  network interruption.
- Save-and-resume path that does not discard progress.

## Constraints

- Structural wireframe only; no production form implementation.
- The form must support backtracking without clearing previous inputs.
- Validation must be inline and summarized when multiple fields fail.
- Mobile must preserve progress, current step, required fields, primary action,
  and save/recovery controls.

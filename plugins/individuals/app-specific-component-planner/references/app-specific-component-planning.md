# Workflow: App-Specific Component Planning

## Objective

Plan components that are tied to app-specific data, domain logic, APIs, or workflows.

## Use This Workflow When

The component involves:

```txt
Shopify product data
variant selection
cart behavior
customer data
repair inquiry data
backend API calls
analytics events
authentication
multi-step workflow
complex UI state
schema-driven editing
```

## Step 1: Identify Domain Model

Document the app data types involved.

Examples:

```txt
Product
Variant
Metafield
CartLine
InquiryThread
Customer
RepairRequest
```

## Step 2: Separate Data From UI

Define:

```txt
domain data type
view model type
mapper function
visual component props
container responsibilities
```

## Step 3: Identify Side Effects

List side effects:

```txt
API fetch
cart mutation
analytics event
route navigation
draft save
form submit
file upload
```

## Step 4: Define State Model

Identify states:

```txt
idle
loading
ready
empty
error
submitting
success
validation-error
```

## Step 5: Define UI Composition

Specify which parts can still be shared UI.

## Output

Produce an app-specific implementation plan with clear separation between:

```txt
container
mapper
view model
shared UI
workflow logic
```

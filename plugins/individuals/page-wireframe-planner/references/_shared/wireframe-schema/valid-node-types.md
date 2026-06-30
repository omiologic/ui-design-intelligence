# Valid Node Types

This file is generated from `shared/vocabulary/node-types.json`. Do not edit it by hand.

Use only these `type` values for UIBlueprint nodes.

## Summary

- `page`: Top-level page or screen container for a complete wireframe.
- `header`: Introductory page region for brand, navigation, and primary page-level actions.
- `footer`: Closing page region for secondary navigation, contact, legal, and support content.
- `main`: Primary page content landmark containing the decision flow.
- `section`: Reusable page region focused on one content purpose.
- `hero`: Primary page or section opener that orients the user and presents the main action.
- `navigation`: Set of links or controls for moving through primary or secondary destinations.
- `breadcrumb`: Hierarchical navigation trail showing the current page location.
- `contentGroup`: Logical grouping of related content and actions.
- `textBlock`: Group of related text content such as eyebrow, heading, body, and captions.
- `heading`: Section, component, or page heading text.
- `paragraph`: Body, helper, caption, metadata, or supporting copy.
- `button`: Single action control.
- `buttonGroup`: Group of related primary, secondary, or tertiary action controls.
- `imagePlaceholder`: Wireframe placeholder for still imagery.
- `videoPlaceholder`: Wireframe placeholder for video or motion media.
- `card`: Reusable content container for a single item, feature, product, or proof point.
- `cardGrid`: Grid or repeated set of cards.
- `list`: Linear collection of related items.
- `table`: Structured rows and columns for comparable data.
- `comparisonTable`: Table optimized for comparing options, plans, products, or features.
- `accordion`: Stack of expandable disclosure items.
- `tabs`: Mutually exclusive content panels selected by tab controls.
- `form`: Input workflow for collecting or submitting user information.
- `inputGroup`: Related form inputs, labels, helper text, and error placement.
- `dialog`: Blocking overlay for focused tasks or confirmations.
- `drawer`: Edge-attached overlay panel for navigation, carts, filters, or secondary workflows.
- `popover`: Lightweight contextual overlay anchored to another control.
- `toast`: Transient non-blocking feedback message.
- `banner`: Prominent inline or page-level message.
- `stickyBar`: Persistent sticky action or status bar.
- `spacer`: Structural spacing marker used only when spacing affects layout semantics.
- `divider`: Structural separator between content groups.
- `annotation`: Non-rendered implementation or review note attached to a wireframe node.

## Semantics

### `page`

Top-level page or screen container for a complete wireframe.

- Overlay only: `false`
- Allowed children: `header`, `main`, `footer`, `banner`, `stickyBar`, `annotation`
- Cardinality: `{"main":{"min":1,"max":1}}`

### `header`

Introductory page region for brand, navigation, and primary page-level actions.

- Overlay only: `false`
- Allowed children: `navigation`, `button`, `buttonGroup`, `banner`, `spacer`, `divider`, `annotation`

### `footer`

Closing page region for secondary navigation, contact, legal, and support content.

- Overlay only: `false`
- Allowed children: `navigation`, `contentGroup`, `textBlock`, `paragraph`, `list`, `buttonGroup`, `divider`, `annotation`

### `main`

Primary page content landmark containing the decision flow.

- Overlay only: `false`
- Allowed children: `breadcrumb`, `hero`, `section`, `tabs`, `accordion`, `form`, `banner`, `stickyBar`, `annotation`

### `section`

Reusable page region focused on one content purpose.

- Overlay only: `false`
- Allowed children: `heading`, `paragraph`, `textBlock`, `contentGroup`, `cardGrid`, `card`, `list`, `table`, `comparisonTable`, `accordion`, `tabs`, `form`, `buttonGroup`, `imagePlaceholder`, `videoPlaceholder`, `spacer`, `divider`, `annotation`

### `hero`

Primary page or section opener that orients the user and presents the main action.

- Overlay only: `false`
- Allowed children: `textBlock`, `contentGroup`, `heading`, `paragraph`, `buttonGroup`, `button`, `imagePlaceholder`, `videoPlaceholder`, `spacer`, `annotation`

### `navigation`

Set of links or controls for moving through primary or secondary destinations.

- Overlay only: `false`
- Allowed children: `button`, `buttonGroup`, `list`, `divider`, `annotation`

### `breadcrumb`

Hierarchical navigation trail showing the current page location.

- Overlay only: `false`
- Allowed children: `list`, `annotation`

### `contentGroup`

Logical grouping of related content and actions.

- Overlay only: `false`
- Allowed children: `heading`, `paragraph`, `textBlock`, `button`, `buttonGroup`, `imagePlaceholder`, `videoPlaceholder`, `list`, `card`, `spacer`, `divider`, `annotation`

### `textBlock`

Group of related text content such as eyebrow, heading, body, and captions.

- Overlay only: `false`
- Allowed children: `heading`, `paragraph`, `button`, `buttonGroup`, `spacer`, `divider`, `annotation`

### `heading`

Section, component, or page heading text.

- Overlay only: `false`
- Allowed children: none

### `paragraph`

Body, helper, caption, metadata, or supporting copy.

- Overlay only: `false`
- Allowed children: none

### `button`

Single action control.

- Overlay only: `false`
- Allowed children: none

### `buttonGroup`

Group of related primary, secondary, or tertiary action controls.

- Overlay only: `false`
- Allowed children: `button`, `annotation`

### `imagePlaceholder`

Wireframe placeholder for still imagery.

- Overlay only: `false`
- Allowed children: none

### `videoPlaceholder`

Wireframe placeholder for video or motion media.

- Overlay only: `false`
- Allowed children: none

### `card`

Reusable content container for a single item, feature, product, or proof point.

- Overlay only: `false`
- Allowed children: `imagePlaceholder`, `videoPlaceholder`, `heading`, `paragraph`, `contentGroup`, `button`, `buttonGroup`, `list`, `divider`, `annotation`

### `cardGrid`

Grid or repeated set of cards.

- Overlay only: `false`
- Allowed children: `card`, `annotation`

### `list`

Linear collection of related items.

- Overlay only: `false`
- Allowed children: `textBlock`, `contentGroup`, `button`, `annotation`

### `table`

Structured rows and columns for comparable data.

- Overlay only: `false`
- Allowed children: `annotation`

### `comparisonTable`

Table optimized for comparing options, plans, products, or features.

- Overlay only: `false`
- Allowed children: `annotation`

### `accordion`

Stack of expandable disclosure items.

- Overlay only: `false`
- Allowed children: `heading`, `paragraph`, `contentGroup`, `textBlock`, `annotation`

### `tabs`

Mutually exclusive content panels selected by tab controls.

- Overlay only: `false`
- Allowed children: `section`, `contentGroup`, `textBlock`, `cardGrid`, `table`, `comparisonTable`, `annotation`
- Cardinality: `{"children":{"min":2}}`

### `form`

Input workflow for collecting or submitting user information.

- Overlay only: `false`
- Allowed children: `heading`, `paragraph`, `inputGroup`, `button`, `buttonGroup`, `banner`, `annotation`

### `inputGroup`

Related form inputs, labels, helper text, and error placement.

- Overlay only: `false`
- Allowed children: `paragraph`, `button`, `annotation`

### `dialog`

Blocking overlay for focused tasks or confirmations.

- Overlay only: `true`
- May be used as a component-root example.
- Allowed children: `heading`, `paragraph`, `textBlock`, `contentGroup`, `form`, `button`, `buttonGroup`, `divider`, `annotation`

### `drawer`

Edge-attached overlay panel for navigation, carts, filters, or secondary workflows.

- Overlay only: `true`
- May be used as a component-root example.
- Allowed children: `navigation`, `heading`, `paragraph`, `contentGroup`, `form`, `button`, `buttonGroup`, `divider`, `annotation`

### `popover`

Lightweight contextual overlay anchored to another control.

- Overlay only: `true`
- May be used as a component-root example.
- Allowed children: `heading`, `paragraph`, `textBlock`, `button`, `buttonGroup`, `annotation`

### `toast`

Transient non-blocking feedback message.

- Overlay only: `true`
- May be used as a component-root example.
- Allowed children: `paragraph`, `button`, `annotation`

### `banner`

Prominent inline or page-level message.

- Overlay only: `false`
- Allowed children: `heading`, `paragraph`, `button`, `buttonGroup`, `annotation`

### `stickyBar`

Persistent sticky action or status bar.

- Overlay only: `false`
- Allowed children: `paragraph`, `button`, `buttonGroup`, `annotation`

### `spacer`

Structural spacing marker used only when spacing affects layout semantics.

- Overlay only: `false`
- Allowed children: none

### `divider`

Structural separator between content groups.

- Overlay only: `false`
- Allowed children: none

### `annotation`

Non-rendered implementation or review note attached to a wireframe node.

- Overlay only: `false`
- Allowed children: none

## Required Node Fields

Every node must include:

- `id`: lowercase kebab-case identifier, unique within the wireframe.
- `type`: one approved node type from this reference.
- `label`: human-readable label for the node.

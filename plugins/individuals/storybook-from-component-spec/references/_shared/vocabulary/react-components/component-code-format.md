# Component Code Format Vocabulary

## Purpose

Component code format records whether a later implementation plan should prefer
plain JSX or TypeScript TSX. It is a planning default, not an instruction for
`ComponentSpec` producers to write code.

## Values

### jsx

Use for plain JavaScript React projects or when the consumer explicitly asks for
JSX.

### tsx

Use for TypeScript React projects, typed props, exported prop types, and
component packages where type contracts matter.

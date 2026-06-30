function formatPath(path) {
  if (path.length === 0) return "$";
  return `$${path.map((part) => (typeof part === "number" ? `[${part}]` : `.${part}`)).join("")}`;
}

function resolvePointer(rootSchema, ref) {
  if (!ref.startsWith("#/")) {
    throw new Error(`unsupported schema ref "${ref}"`);
  }

  return ref
    .slice(2)
    .split("/")
    .reduce((node, part) => {
      const key = part.replace(/~1/g, "/").replace(/~0/g, "~");
      return node?.[key];
    }, rootSchema);
}

function matchesType(value, type) {
  if (type === "array") return Array.isArray(value);
  if (type === "object") return value !== null && typeof value === "object" && !Array.isArray(value);
  if (type === "null") return value === null;
  return typeof value === type;
}

export function validateJsonSchema(value, schema, options = {}) {
  const rootSchema = options.rootSchema ?? schema;
  const errors = [];

  function fail(path, message) {
    errors.push(`${formatPath(path)} ${message}`);
  }

  function visit(currentValue, currentSchema, path) {
    if (!currentSchema || typeof currentSchema !== "object") return;

    if (currentSchema.$ref) {
      const resolved = resolvePointer(rootSchema, currentSchema.$ref);
      if (!resolved) {
        fail(path, `uses unresolved schema ref "${currentSchema.$ref}"`);
        return;
      }
      visit(currentValue, resolved, path);
      return;
    }

    if ("const" in currentSchema && currentValue !== currentSchema.const) {
      fail(path, `must equal ${JSON.stringify(currentSchema.const)}`);
      return;
    }

    if (Array.isArray(currentSchema.enum) && !currentSchema.enum.includes(currentValue)) {
      fail(path, `must be one of: ${currentSchema.enum.join(", ")}`);
      return;
    }

    if (currentSchema.type) {
      const allowedTypes = Array.isArray(currentSchema.type) ? currentSchema.type : [currentSchema.type];
      if (!allowedTypes.some((type) => matchesType(currentValue, type))) {
        fail(path, `must be ${allowedTypes.join(" or ")}`);
        return;
      }
    }

    if (typeof currentValue === "string") {
      if (Number.isInteger(currentSchema.minLength) && currentValue.length < currentSchema.minLength) {
        fail(path, `must be at least ${currentSchema.minLength} character(s)`);
      }
      if (typeof currentSchema.pattern === "string") {
        const regex = new RegExp(currentSchema.pattern);
        if (!regex.test(currentValue)) fail(path, `must match pattern ${currentSchema.pattern}`);
      }
    }

    if (Array.isArray(currentValue)) {
      if (currentSchema.items) {
        currentValue.forEach((item, index) => visit(item, currentSchema.items, [...path, index]));
      }
      return;
    }

    if (!currentValue || typeof currentValue !== "object") return;

    const properties = currentSchema.properties ?? {};
    for (const requiredKey of currentSchema.required ?? []) {
      if (!(requiredKey in currentValue)) fail([...path, requiredKey], "is required");
    }

    for (const [key, item] of Object.entries(currentValue)) {
      const propertySchema = properties[key];
      if (propertySchema) {
        visit(item, propertySchema, [...path, key]);
        continue;
      }

      if (currentSchema.additionalProperties === false) {
        fail([...path, key], "is not allowed");
      } else if (currentSchema.additionalProperties && typeof currentSchema.additionalProperties === "object") {
        visit(item, currentSchema.additionalProperties, [...path, key]);
      }
    }
  }

  visit(value, schema, []);
  return errors;
}

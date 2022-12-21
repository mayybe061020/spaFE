type parserStrategyFn = (
  data: object,
  formData: FormData,
  fieldName: string
) => void | Promise<void>;

export function jsonToFormData<T extends object>(
  rawJSON: T,
  formData: FormData = new FormData(),
  opts?: {
    // simple strategy will simply `.toString()` or `JSON.stringify()` the object.
    strategy?: parserStrategyFn | "simple";
  }
) {
  for (const field of Object.keys(rawJSON)) {
    const formKey = field as unknown as keyof T;
    if (!Object.hasOwn(rawJSON, formKey)) {
      continue;
    }

    if (rawJSON[formKey] === null || rawJSON[formKey] === undefined) {
      continue;
    }
    const valueField = rawJSON[formKey];
    const strategy = opts?.strategy ?? "simple";
    let fn: parserStrategyFn;
    if (strategy === "simple") {
      fn = SimpleParseStrategy;
    } else {
      fn = strategy;
    }

    if (typeof valueField === "object") {
      if (valueField instanceof File) {
        formData.append(field, valueField);
        continue;
      } else if (valueField instanceof Date) {
        formData.append(field, valueField.toISOString());
        continue;
      }
      fn(valueField as object, formData, field);
      continue;
    }
    formData.append(
      field,
      typeof valueField === "string" ? valueField : JSON.stringify(valueField)
    );
  }

  return formData;
}

// Map RHF's dirtyFields over the `data` received by `handleSubmit` and return the changed subset of that data.
export function dirtyValues(
  dirtyFields: object | boolean,
  allValues: object
): object {
  // If *any* item in an array was modified, the entire array must be submitted, because there's no way to indicate
  // "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
  if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues;
  // Here, we have an object
  return Object.fromEntries(
    Object.keys(dirtyFields).map((key) => [
      key,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dirtyValues(dirtyFields[key], allValues[key]),
    ])
  );
}

/**
 * Fn returns a function used in handling submit data depending on the view mode.
 * @param mode
 * @param dirtyFields
 * @param onClosed
 * @param data must have `id` field if the `mode` === `view`
 * @constructor
 */
export function DialogSubmit<
  T extends { id?: number },
  submitType extends object
>(
  mode: "view" | "create",
  dirtyFields: object | boolean,
  onClosed?: (arg0: never) => void,
  data?: T
) {
  return (d: submitType) => {
    if (mode === "view") {
      onClosed &&
        onClosed({
          ...dirtyValues(dirtyFields, d),
          id: data?.id,
        } as never);
    } else {
      onClosed && onClosed(d as never);
    }
  };
}

/**
 * Form data parsing complex object type strategy.
 * This strategy will try to trigger either `.toString()` or `JSON.stringify` of the object.
 */
export const SimpleParseStrategy: parserStrategyFn = (
  data: object,
  formData,
  parentName
) =>
  formData.append(
    parentName,
    data.toString ? data.toString() : JSON.stringify(data)
  );

/**
 * Form data parsing complex object type strategy.
 * This strategy will try to stringify the data with `JSON.stringify`.
 */
export const StringifyParseStrategy: parserStrategyFn = (
  data: object,
  formData,
  parentName
) => {
  return formData.append(parentName, JSON.stringify(data));
};

/**
 * Form data parsing complex object type strategy.
 * This strategy will create an array field and stringify all values in that array.
 */
export const SimpleArrayParseStrategy: parserStrategyFn = (
  data: object,
  formData,
  parentName
) => {
  if (!Array.isArray(data)) {
    return StringifyParseStrategy(data, formData, parentName);
  }
  const name = `${parentName}[]`;
  return data.forEach((k) => {
    StringifyParseStrategy(k, formData, name);
  });
};

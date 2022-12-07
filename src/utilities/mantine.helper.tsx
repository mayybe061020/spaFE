import { CSSObject, InputVariant, MantineSize, Text } from "@mantine/core";
import React from "react";

export const stateInputProps = (
  label?: string,
  readonly?: boolean,
  otp?: {
    withStyle?: boolean;
    required?: boolean;
    size?: MantineSize;
    variant?: InputVariant;
    weight?: number;
    textAlign?: React.CSSProperties["textAlign"];
    width?: React.CSSProperties["width"];
    placeholder?: string;
  }
) => ({
  label: label ? (
    <Text color={"dimmed"} size={"sm"}>
      {label}{" "}
      {!readonly && otp?.required ? (
        <span className="text-red-500">*</span>
      ) : (
        ""
      )}
    </Text>
  ) : undefined,
  variant: (readonly ? "unstyled" : otp?.variant ?? "filled") as InputVariant,
  readOnly: readonly,
  placeholder: readonly ? "N/A" : otp?.placeholder,
  sx:
    readonly && otp?.withStyle !== false
      ? {
          input: {
            height: 32,
            lineHeight: 32,
            fontWeight: otp?.weight ?? 500,
            color: "#000",
            opacity: 1,
            textAlign: otp?.textAlign,
            width: otp?.width,
          } as CSSObject,
          textarea: {
            fontWeight: otp?.weight ?? 500,
            padding: 0,
            opacity: 1,
            width: otp?.width,
          } as CSSObject,
        }
      : undefined,
  width: "100%",
  size: otp?.size ?? "lg",
});

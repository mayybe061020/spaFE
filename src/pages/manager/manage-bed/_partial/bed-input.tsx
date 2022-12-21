import {
  SpaBedModel,
  SpaBedUpdateEntity,
} from "../../../../model/spa-bed.model";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { idDbSchema, nameSchema } from "../../../../validation/field.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, TextInput } from "@mantine/core";
import { IconArrowBack, IconPencil, IconTrash } from "@tabler/icons";
import React, { FormEvent } from "react";

const schema = z.object({
  id: idDbSchema.optional(),
  name: nameSchema,
});

type BedInputBaseProps = {
  rowIndex?: string | number | React.ReactNode | JSX.Element;
  submitIcon?: JSX.Element;
  isResettable?: boolean;
};

type BedInputProps = BedInputBaseProps &
  (
    | {
        data: SpaBedModel;
        onRemoved?: (id: number) => void;
        onChanged: (data: SpaBedUpdateEntity) => void;
      }
    | {
        data?: SpaBedModel;
        onChanged: (data: SpaBedUpdateEntity) => void;
      }
  );

const BedInput = (props: BedInputProps) => {
  const {
    reset,
    handleSubmit,
    register,
    formState: { isDirty, isValid },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: props.data && { ...props.data },
  });

  function onResetForm(e: FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    reset();
  }

  function submitData(data: z.infer<typeof schema>) {
    props.onChanged && props.onChanged(data as SpaBedUpdateEntity);
    reset();
  }

  return (
    <form
      onReset={onResetForm}
      onSubmit={handleSubmit(submitData)}
      className="flex w-full space-x-2"
    >
      {props.rowIndex !== undefined && (
        <div className={"flex w-12 items-center justify-end px-2"}>
          {props.rowIndex}
        </div>
      )}
      <TextInput className={"flex-1"} {...register("name")} />
      {(isDirty || !props.data) && (
        <>
          <ActionIcon
            disabled={!isValid}
            type={"submit"}
            color={"teal"}
            variant={"filled"}
            h={36}
            w={36}
          >
            {props.submitIcon ?? <IconPencil />}
          </ActionIcon>
        </>
      )}

      {isDirty && props.isResettable && (
        <>
          <ActionIcon
            type={"reset"}
            color={"orange"}
            variant={"filled"}
            h={36}
            w={36}
          >
            <IconArrowBack />
          </ActionIcon>
        </>
      )}

      {!isDirty && (props as any).onRemoved && props.data && (
        <>
          <ActionIcon
            type={"button"}
            onClick={() =>
              (props as any).onRemoved &&
              (props as any).onRemoved(props.data?.id)
            }
            color={"red"}
            variant={"filled"}
            h={36}
            w={36}
          >
            <IconTrash />
          </ActionIcon>
        </>
      )}
    </form>
  );
};

export default BedInput;

import {
  SupplierCreateEntity,
  SupplierModel,
  SupplierUpdateEntity,
} from "../../../model/supplier.model";
import { DialogProps } from "../../../interfaces/dialog-detail-props.interface";
import { Input, Modal, Textarea, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { FormEvent } from "react";
import DialogDetailAction from "../../../components/dialog-detail-action";
import FormErrorMessage from "../../../components/form-error-message";
import MaskedInput from "react-text-mask";
import { PhoneNumberMask } from "../../../const/input-masking.const";
import {
  addressSchema,
  descriptionSchema,
  emailSchema,
  idDbSchema,
  nameSchema,
  phoneSchema,
  taxCodeSchema,
} from "../../../validation/field.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogSubmit } from "../../../utilities/form-data.helper";

const SupplierDetailDialog = ({
  data,
  opened,
  onClosed,
  mode,
}: DialogProps<SupplierModel, SupplierUpdateEntity, SupplierCreateEntity>) => {
  const idSchema = mode === "create" ? idDbSchema.optional() : idDbSchema;
  const validateSchema = z.object({
    id: idSchema,
    name: nameSchema,
    taxCode: taxCodeSchema,
    description: descriptionSchema.optional(),
    phone: phoneSchema,
    email: emailSchema,
    address: addressSchema,
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, dirtyFields },
  } = useForm<z.infer<typeof validateSchema>>({
    resolver: zodResolver(validateSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues:
      mode === "view" && data
        ? {
            ...data,
          }
        : undefined,
  });

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClosed && onClosed();
  };

  const submit = (formData: object) =>
    DialogSubmit(mode, dirtyFields, onClosed, data)(formData);

  return (
    <Modal
      onClose={() => reset()}
      opened={opened}
      closeOnClickOutside={false}
      withCloseButton={false}
      size={"auto"}
      padding={0}
    >
      <div
        className={`rounded-[4px] border-2 p-4 ${
          mode === "view" && isDirty
            ? "border-yellow-600"
            : "border-transparent"
        }`}
      >
        <h2 className={"m-4 text-xl font-semibold uppercase"}>
          {mode === "view" ? "Supplier Detail" : "Add Supplier"}
        </h2>
        <form
          onReset={handleReset}
          onSubmit={handleSubmit(submit)}
          className={`flex w-[800px] flex-wrap space-x-4 p-4`}
        >
          <div className="flex flex-1 flex-col">
            <TextInput required label={"Supplier Name"} {...register("name")} />
            <FormErrorMessage errors={errors} name={"name"} />

            <TextInput
              maxLength={10}
              required
              label={"Tax Code"}
              {...register("taxCode")}
            />
            <FormErrorMessage errors={errors} name={"taxCode"} />

            <Textarea
              required
              label={"Description"}
              {...register("description")}
            />
            <FormErrorMessage errors={errors} name={"description"} />
          </div>
          <div className="flex flex-1 flex-col">
            {/* Manual handle Form binding because mask-input does not expose `ref` for hook*/}
            <Controller
              name={"phone"}
              control={control}
              render={({ field }) => (
                <Input.Wrapper required id={"phone"} label={"Phone Number"}>
                  <Input
                    component={MaskedInput}
                    mask={PhoneNumberMask}
                    placeholder={"0127749999"}
                    defaultValue={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </Input.Wrapper>
              )}
            />
            <FormErrorMessage errors={errors} name={"phone"} />

            <TextInput
              required
              type="email"
              label={"Email"}
              id={"email"}
              placeholder={"manufacture@domain.com"}
              {...register("email")}
            />
            <FormErrorMessage errors={errors} name={"email"} />

            <Textarea
              label={"Address"}
              autosize={false}
              rows={4}
              placeholder={"supplier address..."}
              required
              {...register("address")}
            ></Textarea>
            <FormErrorMessage errors={errors} name={"address"} />
          </div>

          <div className="mt-4 flex w-full justify-end">
            <DialogDetailAction
              mode={mode}
              isDirty={isDirty}
              isValid={isValid}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SupplierDetailDialog;

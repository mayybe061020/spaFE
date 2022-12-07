import { CustomerModel } from "../../../../../model/customer.model";
import {
  Avatar,
  Button,
  Input,
  Select,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import FormErrorMessage from "../../../../../components/form-error-message";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  addressSchema,
  ageSchemaFn,
  emailSchema,
  genderSchema,
  idDbSchema,
  nameSchema,
  phoneSchema,
} from "../../../../../validation/field.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { GENDER } from "../../../../../const/gender.const";
import { DatePicker } from "@mantine/dates";
import MaskedInput from "react-text-mask";
import { PhoneNumberMask } from "../../../../../const/input-masking.const";
import { DialogSubmit } from "../../../../../utilities/form-data.helper";
import { FormEvent } from "react";
import { stateInputProps } from "../../../../../utilities/mantine.helper";
import { ageTilToday } from "../../../../../utilities/time.helper";

type FormProps = {
  data?: CustomerModel;
  readonly?: boolean;
  onChanged?: (mutatedData?: unknown) => void;
  mode: "view" | "create";
};

const InformationForm = ({ data, readonly, mode, onChanged }: FormProps) => {
  const idSchema =
    mode === "create" ? idDbSchema.optional().nullable() : idDbSchema;
  const schema = z.object({
    id: idSchema,
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema,
    gender: genderSchema,
    dateOfBirth: ageSchemaFn(),
    address: addressSchema,
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, dirtyFields },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: data
      ? {
          ...data,
          dateOfBirth: data.dateOfBirth
            ? dayjs(data.dateOfBirth).toDate()
            : undefined,
        }
      : undefined,
  });

  const submitData = (dataSubmit: z.infer<typeof schema>) =>
    DialogSubmit(mode, dirtyFields, onChanged, data)(dataSubmit);

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
    onChanged && onChanged();
  };

  return (
    <form
      className={"container mx-auto flex flex-wrap space-x-4 p-8"}
      onReset={handleReset}
      onSubmit={handleSubmit(submitData)}
    >
      <Avatar
        size="xl"
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
      />

      <fieldset
        disabled={readonly}
        className={"flex w-full flex-col md:flex-1"}
      >
        <TextInput
          {...register("name")}
          {...stateInputProps("Tên khách hàng", readonly, { required: true })}
        />
        <FormErrorMessage name={"name"} errors={errors} />

        <Controller
          render={({ field }) => (
            <Select
              data={[
                { value: GENDER.male, label: "Male" },
                { value: GENDER.female, label: "Female" },
                { value: GENDER.other, label: "other" },
              ]}
              onChange={(e) => {
                field.onChange(e);
                field.onBlur();
              }}
              onBlur={field.onBlur}
              defaultValue={field.value}
              {...stateInputProps("Giới Tính", readonly, { required: true })}
            />
          )}
          name={"gender"}
          control={control}
        />
        <FormErrorMessage errors={errors} name={"gender"} />

        <Controller
          render={({ field }) => (
            <DatePicker
              minDate={dayjs(new Date()).subtract(64, "years").toDate()}
              maxDate={dayjs(new Date()).subtract(18, "years").toDate()}
              onChange={(e) => {
                field.onChange(e);
                field.onBlur();
              }}
              onBlur={field.onBlur}
              defaultValue={field.value}
              rightSectionWidth={150}
              rightSection={
                <Text className={"w-full"} size={"xs"}>
                  {field.value ? `(${ageTilToday(field.value)} old)` : "-"}
                </Text>
              }
              {...stateInputProps("Ngày sinh", readonly, {
                required: true,
                placeholder: "In range of 18-64 years old",
              })}
            />
          )}
          name={"dateOfBirth"}
          control={control}
        />
        <FormErrorMessage errors={errors} name={"dateOfBirth"} />

        <Controller
          name={"phone"}
          control={control}
          render={({ field }) => (
            <Input.Wrapper
              label={
                <Text color={"dimmed"} size={"sm"}>
                  Phone Number{" "}
                  {readonly ? "" : <span className="text-red-500">*</span>}
                </Text>
              }
            >
              <Input
                component={MaskedInput}
                mask={PhoneNumberMask}
                onChange={field.onChange}
                onBlur={field.onBlur}
                defaultValue={field.value}
                {...stateInputProps(undefined, readonly, {
                  required: true,
                  placeholder: "0127749999",
                })}
              />
            </Input.Wrapper>
          )}
        />
        <FormErrorMessage errors={errors} name={"phone"} />

        <TextInput
          type="email"
          {...register("email")}
          {...stateInputProps("Email", readonly, {
            placeholder: "john_smith@domain.com",
          })}
        />
        <FormErrorMessage errors={errors} name={"email"} />

        <Textarea
          autosize={false}
          rows={4}
          {...register("address")}
          {...stateInputProps("Địa Chỉ", readonly, {
            placeholder: "the address of the customer...",
          })}
        ></Textarea>
        <FormErrorMessage errors={errors} name={"address"} />
      </fieldset>

      {isDirty && (
        <div className="flex w-full justify-end space-x-4">
          <Button
            disabled={!isValid}
            type={"submit"}
            variant={"filled"}
            color={mode === "create" ? "teal" : "orange"}
          >
            {mode === "create"
              ? "Tạo thông tin khách hàng"
              : "Cập nhật thông tin"}
          </Button>
        </div>
      )}
    </form>
  );
};

export default InformationForm;

import {
  Avatar,
  Divider,
  Input,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import MaskedInput from "react-text-mask";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormErrorMessage from "../../../components/form-error-message";
import { PhoneNumberMask } from "../../../const/input-masking.const";
import { useQuery } from "@tanstack/react-query";
import AutoCompleteItem, {
  AutoCompleteItemProp,
} from "../../../components/auto-complete-item";
import {
  addressSchema,
  emailSchema,
  fileUploadSchema,
  imageTypeSchema,
  nameSchema,
  phoneSchema,
} from "../../../validation/field.schema";
import { BranchCreateEntity } from "../../../model/branch.model";
import { getAllFreeManager } from "../../../services/manager.service";
import { ManagerModel } from "../../../model/manager.model";
import DialogDetailAction from "../../../components/dialog-detail-action";
import ImageUpload from "../../../components/image-upload";
import { FormEvent } from "react";
import { linkImage } from "../../../utilities/image.helper";

/**
 * Component props
 * `onSave()` will trigger with the data from the form.
 */
type CreateBranchPropsType = {
  onSave?: (branchData?: BranchCreateEntity) => void;
};

const CreateBranch = ({ onSave }: CreateBranchPropsType) => {
  // schema validation
  const createSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    manager: z.number().min(1),
    address: addressSchema,
    logo: fileUploadSchema.and(imageTypeSchema).nullable().optional(),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    mode: "onBlur",
  });

  const { data: availableManager, isLoading: managerLoading } = useQuery<
    AutoCompleteItemProp<ManagerModel>[]
  >(["available-manager"], async () => {
    // retrieve free managers - managers which don't associate with any branch.
    const manager = await getAllFreeManager();
    return manager.map((m) => ({
      // add fields of SelectItemGeneric
      value: String(m.id),
      label: m.name,
      data: {
        ...m,
        description: m.phone,
        image: m.image,
      },
    }));
  });

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
    onSave && onSave();
  };

  return (
    <form
      onReset={handleReset}
      onSubmit={onSave && handleSubmit(onSave)}
      className={"flex flex-col"}
    >
      <TextInput
        label={"Branch Name"}
        description={
          <small className="mb-2 leading-tight text-gray-500">
            Hãy đặt tên chi nhánh theo đúng{" "}
            <Link className="inline text-blue-600 underline" href={"/404"}>
              quy định
            </Link>
          </small>
        }
        placeholder={"enter the branch name..."}
        required
        {...register("name")}
      ></TextInput>
      <FormErrorMessage errors={errors} name={"name"} />

      <Controller
        render={({ field }) => (
          <Select
            data={!availableManager || managerLoading ? [] : availableManager}
            placeholder={"branch's manager name..."}
            label={"Manager Name"}
            searchable
            itemComponent={AutoCompleteItem}
            nothingFound="No options"
            maxDropdownHeight={200}
            onChange={(v) => field.onChange(Number(v))}
            onBlur={field.onBlur}
            required
          />
        )}
        name={"manager"}
        control={control}
      />
      <FormErrorMessage errors={errors} name={"manager"} />

      <Textarea
        label={"Branch's Address"}
        autosize={false}
        rows={4}
        placeholder={"the address of the branch..."}
        id={"branchAddress"}
        required
        {...register("address")}
      ></Textarea>
      <FormErrorMessage errors={errors} name={"address"} />

      {/* Manual handle Form binding because mask-input does not expose `ref` for hook*/}
      <Controller
        name={"phone"}
        control={control}
        render={({ field }) => (
          <Input.Wrapper required id={"phone"} label={"Phone number"}>
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
        {...register("email")}
      />
      <FormErrorMessage errors={errors} name={"email"} />

      <label htmlFor="file" className="text-[14px] text-gray-900">
        Branch Logo <span className="text-red-500">*</span>
      </label>
      <small className="mb-1 text-[12px] leading-tight text-gray-400">
        The logo must be less than 5MB, in *.PNG, *.JPEG, or *.WEBP format.
      </small>
      {/* Manual handle Form binding because btn does not expose `ref` for hook*/}
      <Controller
        name={"logo"}
        control={control}
        render={({ field }) => (
          <ImageUpload
            onChange={(f) => {
              field.onChange(f);
              field.onBlur();
            }}
            render={(file) => (
              <Avatar
                radius={4}
                size={160}
                className={"border"}
                src={linkImage(file)}
                alt="User Avatar"
              />
            )}
          />
        )}
      />
      <FormErrorMessage errors={errors} name={"logo"} />

      <Divider my={16} />

      <DialogDetailAction mode={"create"} isDirty={isDirty} isValid={isValid} />
    </form>
  );
};

export default CreateBranch;

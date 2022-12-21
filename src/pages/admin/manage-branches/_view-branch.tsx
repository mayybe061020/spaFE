import {
  Avatar,
  Divider,
  Input,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { BranchModel, BranchUpdateEntity } from "../../../model/branch.model";
import { ManagerModel } from "../../../model/manager.model";
import AutoCompleteItem, {
  AutoCompleteItemProp,
} from "../../../components/auto-complete-item";
import FormErrorMessage from "../../../components/form-error-message";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  addressSchema,
  emailSchema,
  fileUploadSchema,
  imageTypeSchema,
  nameSchema,
  phoneSchema,
} from "../../../validation/field.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import MaskedInput from "react-text-mask";
import { PhoneNumberMask } from "../../../const/input-masking.const";
import { FormEvent } from "react";
import DialogDetailAction from "../../../components/dialog-detail-action";
import { getAllFreeManager } from "../../../services/manager.service";
import { DialogSubmit } from "../../../utilities/form-data.helper";
import ImageUpload from "../../../components/image-upload";
import { linkImage } from "../../../utilities/image.helper";

type ViewBranchPropsType = {
  branchData: BranchModel<ManagerModel>;
  onClose: (branchData?: BranchUpdateEntity) => void;
};

const BranchInfo = ({ branchData, onClose }: ViewBranchPropsType) => {
  // schema validation
  const updateSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    manager: z.number().min(1),
    address: addressSchema,
    logo: fileUploadSchema
      .and(imageTypeSchema)
      .or(z.string())
      .nullable()
      .optional(),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm<BranchUpdateEntity>({
    resolver: zodResolver(updateSchema),
    mode: "onChange",
    defaultValues: { ...branchData, manager: branchData.manager.id },
  });

  const { data: availableManager, isLoading: managerLoading } = useQuery<
    AutoCompleteItemProp<ManagerModel>[]
  >(["available-manager", branchData], async () => {
    const manager = await getAllFreeManager();
    const parser = manager.map((m) => ({
      // add fields of SelectItemGeneric
      value: String(m.id),
      label: m.name,
      data: {
        ...m,
        description: m.phone,
      },
    }));
    // since the API does not return the current manager,
    // we simply add it to the beginning of the array and disable it.
    parser.unshift({
      value: String(branchData.manager.id),
      label: branchData.manager.name,
      disabled: true,
      data: {
        ...branchData.manager,
        description: branchData.manager.phone,
        image: branchData.manager.image,
      },
    } as AutoCompleteItemProp<ManagerModel>);
    return parser;
  });

  const onSubmit = (data: BranchUpdateEntity) =>
    DialogSubmit("view", dirtyFields, onClose, branchData)(data);

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
    onClose && onClose();
  };

  return (
    <form
      onReset={handleReset}
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[600px] space-x-4"
    >
      <div className="flex w-32 flex-col space-y-2">
        <Controller
          name={"logo"}
          control={control}
          render={({ field }) => (
            <ImageUpload
              onChange={(f) => {
                field.onChange(f);
                field.onBlur();
              }}
              defaultSrc={field.value as string}
              render={(file) => (
                <Avatar
                  radius={80}
                  size={126}
                  className={"border"}
                  src={linkImage(file)}
                  alt="User Avatar"
                />
              )}
            />
          )}
        />
        <FormErrorMessage className={"text-sm"} errors={errors} name={"logo"} />
      </div>

      <div className={"flex flex-1 flex-col"}>
        <small className={"leading-none text-gray-500"}>Chi nhánh</small>
        <h1 className={"mb-2 text-2xl font-semibold"}>{branchData.name}</h1>

        <Controller
          render={({ field }) => (
            <Select
              data={!availableManager || managerLoading ? [] : availableManager}
              placeholder={"Quản lý chi nhánh..."}
              label={"Tên quản lý chi nhánh"}
              searchable
              itemComponent={AutoCompleteItem}
              nothingFound="No options"
              maxDropdownHeight={200}
              onChange={(v) => field.onChange(Number(v))}
              onBlur={field.onBlur}
              defaultValue={String(branchData.manager.id)}
              required
            />
          )}
          name={"manager"}
          control={control}
        />
        <FormErrorMessage errors={errors} name={"manager"} />

        <Textarea
          label={"Địa chỉ"}
          autosize={false}
          rows={4}
          placeholder={"Địa chỉ chi nhánh..."}
          id={"branchAddress"}
          required
          {...register("address")}
          className={"!text-black"}
        ></Textarea>
        <FormErrorMessage errors={errors} name={"address"} />

        {/* Manual handle Form binding because mask-input does not expose `ref` for hook*/}
        <Controller
          name={"phone"}
          control={control}
          render={({ field }) => (
            <Input.Wrapper required id={"phone"} label={"Số điện thoại"}>
              <Input
                component={MaskedInput}
                mask={PhoneNumberMask}
                placeholder={"012 774 9999"}
                onChange={field.onChange}
                onBlur={field.onBlur}
                defaultValue={field.value}
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

        <Divider my={8} />
        <div className="flex w-full justify-end">
          <DialogDetailAction
            mode={"view"}
            isDirty={isDirty && Object.keys(dirtyFields).length > 0}
            isValid={isValid}
          />
        </div>
      </div>
    </form>
  );
};

export default BranchInfo;

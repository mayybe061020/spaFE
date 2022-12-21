import {
  ManagerCreateEntity,
  ManagerModel,
} from "../../../model/manager.model";
import { FC, FormEvent } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Divider,
  Input,
  Modal,
  Radio,
  Textarea,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import FormErrorMessage from "../../../components/form-error-message";
import MaskedInput from "react-text-mask";
import { PhoneNumberMask } from "../../../const/input-masking.const";
import { DatePicker } from "@mantine/dates";
import { GENDER } from "../../../const/gender.const";
import dayjs from "dayjs";
import {
  managerModelSchema,
  userRegisterSchemaFn,
} from "../../../validation/account-model.schema";
import DialogDetailAction from "../../../components/dialog-detail-action";
import ImageUpload from "../../../components/image-upload";
import { DialogCreateProps } from "../../../interfaces/dialog-detail-props.interface";
import { DialogSubmit } from "../../../utilities/form-data.helper";
import { linkImage } from "../../../utilities/image.helper";

const CreateManager: FC<
  DialogCreateProps<ManagerModel, ManagerCreateEntity>
> = ({ onClosed, opened }) => {
  const createManagerSchema = userRegisterSchemaFn(managerModelSchema);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm<z.infer<typeof createManagerSchema>>({
    resolver: zodResolver(createManagerSchema),
    mode: "onBlur",
    criteriaMode: "all",
  });

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClosed && onClosed();
  };

  const submit = (formData: object) =>
    DialogSubmit("view", dirtyFields, onClosed)(formData);

  return (
    <Modal
      title={<h1 className="text-center font-thin capitalize">Thêm mới tài khoản</h1>}
      opened={opened}
      size={"auto"}
      onClose={() => reset()}
      closeOnClickOutside={false}
      withCloseButton={false}
    >
      <form
        onReset={handleReset}
        onSubmit={handleSubmit(submit)}
        className={"flex flex-col"}
      >
        <h3 className="my-2 mt-4 select-none border-l-2 pl-4 text-lg uppercase text-gray-500">
          Thông tin cá nhân
        </h3>
        <TextInput
          label={"Tên Quản Lý"}
          description={
            <small className="mb-2 leading-tight text-gray-500">
              Hãy đặt tên theo đúng quy định
            </small>
          }
          placeholder={"Tên đầy đủ"}
          required
          {...register("name")}
        />
        <FormErrorMessage errors={errors} name={"name"} />
        {/* Manual handle Form binding because mask-input does not expose `ref` for hook*/}
        <Controller
          name={"phone"}
          control={control}
          render={({ field }) => (
            <Input.Wrapper required id={"phone"} label={"Số Điện Thoại"}>
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
          placeholder={"john_smith@domain.com"}
          {...register("email")}
        />
        <FormErrorMessage errors={errors} name={"email"} />
        <Controller
          render={({ field }) => (
            <DatePicker
              minDate={dayjs(new Date()).subtract(64, "years").toDate()}
              maxDate={dayjs(new Date()).subtract(18, "years").toDate()}
              placeholder="Trong khoảng 18-64 tuổi"
              label="Ngày Sinh"
              withAsterisk
              onChange={(e) => {
                field.onChange(e);
                field.onBlur();
              }}
              onBlur={field.onBlur}
              defaultValue={field.value}
            />
          )}
          name={"dateOfBirth"}
          control={control}
        />
        <FormErrorMessage errors={errors} name={"dateOfBirth"} />

        <Controller
          render={({ field }) => (
            <Radio.Group
              name={"gender"}
              label="Giới Tính"
              onChange={(e) => {
                field.onChange(e);
                field.onBlur();
              }}
              onBlur={field.onBlur}
              defaultValue={field.value}
              withAsterisk
            >
              <Radio value={GENDER.male} label="Nam" />
              <Radio value={GENDER.female} label="Nữ" />
            </Radio.Group>
          )}
          name={"gender"}
          control={control}
        />
        <FormErrorMessage errors={errors} name={"gender"} />

        <Textarea
          label={"Địa chỉ"}
          autosize={false}
          rows={4}
          placeholder={"Nhập địa chỉ..."}
          id={"branchAddress"}
          required
          {...register("address")}
        ></Textarea>
        <FormErrorMessage errors={errors} name={"address"} />

        <Divider my={8} />
        <h3 className="my-2 mt-4 select-none border-l-2 pl-4 text-lg uppercase text-gray-500">
          Thông tin tài khoản
          <small className="block text-xs normal-case text-gray-500">
            Sử dụng email đăng ký bên trên và mật khẩu dưới để đăng nhập
          </small>
        </h3>

        <TextInput
          label={"Mật Khẩu"}
          id={"password"}
          type="password"
          placeholder={"3-30 ký tự"}
          required
          {...register("password")}
        />
        <FormErrorMessage errors={errors} name={"password"} />

        <TextInput
          label={"Xác Nhận Mật Khẩu"}
          id={"confirmPassword"}
          type="password"
          placeholder={"giống mật khẩu..."}
          required
          {...register("confirmPassword")}
        />
        <FormErrorMessage errors={errors} name={"confirmPassword"} />

        <label htmlFor="file" className="text-[14px] font-[500] text-gray-900">
          Ảnh đại diện<span className="text-red-500">*</span>
        </label>
        <small className="mb-1 text-[12px] leading-tight text-gray-400">
          Ảnh đại diện phải nhỏ hơn 5 MB, ở định dạng *.PNG, *.JPEG hoặc *.WEBP.
        </small>
        {/* Manual handle Form binding because btn does not expose `ref` for hook*/}
        <Controller
          name={"image"}
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
                  size={160}
                  className={"border"}
                  src={linkImage(file)}
                  alt="User Avatar"
                />
              )}
            />
          )}
        />
        <FormErrorMessage errors={errors} name={"image"} />

        <Divider my={8} />

        <DialogDetailAction
          mode={"create"}
          isDirty={isDirty && Object.keys(dirtyFields).length > 0}
          isValid={isValid}
        />
      </form>
    </Modal>
  );
};

export default CreateManager;

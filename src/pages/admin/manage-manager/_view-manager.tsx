import { FC, FormEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Divider,
  Image as MantineImage,
  Input,
  Modal,
  PasswordInput,
  Radio,
  Textarea,
  TextInput,
} from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import MaskedInput from "react-text-mask";
import { DatePicker } from "@mantine/dates";
import { z } from "zod";
import {
  ManagerModel,
  ManagerUpdateEntity,
} from "../../../model/manager.model";
import FormErrorMessage from "../../../components/form-error-message";
import { PhoneNumberMask } from "../../../const/input-masking.const";
import { GENDER } from "../../../const/gender.const";
import { managerModelSchema } from "../../../validation/account-model.schema";
import DialogDetailAction from "../../../components/dialog-detail-action";
import { DialogSubmit } from "../../../utilities/form-data.helper";
import ImageUpload from "../../../components/image-upload";
import { DialogViewProps } from "../../../interfaces/dialog-detail-props.interface";
import { linkImage } from "../../../utilities/image.helper";

const ViewManagerDialog: FC<
  DialogViewProps<ManagerModel, ManagerUpdateEntity>
> = ({ data, onClosed, opened }) => {
  const updateManagerSchema = managerModelSchema.merge(
    z.object({
      id: z.literal(data.id),
      password: z
        .union([z.string().min(4), z.string().length(0)])
        .optional()
        .transform((e) => (e === "" ? undefined : e)),
    })
  );

  const defaultValue = {
    ...data,
    dateOfBirth: data.dateOfBirth
      ? dayjs(data.dateOfBirth).toDate()
      : undefined,
    password: undefined,
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm<ManagerUpdateEntity>({
    resolver: zodResolver(updateManagerSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: defaultValue,
  });

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClosed && onClosed();
  };

  const submit = (formData: object) =>
    DialogSubmit("view", dirtyFields, onClosed, data)(formData);

  return (
    <Modal
      title={
        <h1 className="text-center font-thin capitalize">Thông tin tài khoản</h1>
      }
      opened={opened}
      size={"auto"}
      onClose={() => reset()}
      closeOnClickOutside={false}
      withCloseButton={false}
    >
      <form
        onReset={handleReset}
        onSubmit={handleSubmit(submit)}
        className={"flex w-[500px] space-x-2"}
      >
        <div className="flex flex-col">
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
                  <MantineImage
                    width={128}
                    height={128}
                    radius="md"
                    src={linkImage(file)}
                    alt="Logo image"
                    className="mb-2 select-none rounded-lg border object-cover shadow-xl"
                  />
                )}
              />
            )}
          />
          <FormErrorMessage
            className={"text-sm"}
            errors={errors}
            name={"image"}
          />
        </div>

        <div className="flex flex-1 flex-col">
          <small className={"text-gray-500"}>Tên Quản Lý</small>
          <TextInput
            required
            variant={"unstyled"}
            size={"xl"}
            sx={{ input: { fontSize: 28 } }}
            className={"mb-2 rounded border px-2 font-semibold !leading-normal"}
            {...register("name")}
          />

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
            {...register("email")}
          />
          <FormErrorMessage errors={errors} name={"email"} />

          <Controller
            render={({ field }) => (
              <DatePicker
                minDate={dayjs(new Date()).subtract(64, "years").toDate()}
                maxDate={dayjs(new Date()).subtract(18, "years").toDate()}
                placeholder="trong khoảng 18-64 tuổi"
                label="Ngày sinh"
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
                label="Giới tính"
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
            id={"address"}
            required
            {...register("address")}
            className={"!text-black"}
          ></Textarea>
          <FormErrorMessage errors={errors} name={"address"} />

          <Divider my={8} />
          <h3
            onClick={() => {
              console.log(updateManagerSchema.safeParse(getValues()));
            }}
            className="my-2 mt-4 select-none border-l-2 pl-4 text-lg uppercase text-gray-500"
          >
            Reset mật khẩu
            <small className={"block text-xs normal-case text-gray-500"}>
              Đặt lại mật khẩu cho tài khoản
            </small>
          </h3>
          <PasswordInput
            placeholder={"Để trống nếu không thay đổi"}
            {...register("password")}
          />
          <FormErrorMessage errors={errors} name={"password"} />

          <Divider my={8} />
          <div className="flex justify-end space-x-2">
            <DialogDetailAction
              mode={"view"}
              isDirty={isDirty && Object.keys(dirtyFields).length > 0}
              isValid={isValid}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ViewManagerDialog;

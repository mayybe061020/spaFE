import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaffCreateEntity } from "../../../model/staff.model";
import { GENDER } from "../../../const/gender.const";
import {
  employeeModelSchema,
  userRegisterSchemaFn,
} from "../../../validation/account-model.schema";
import { FC, FormEvent } from "react";
import DialogDetailAction from "../../../components/dialog-detail-action";
import { DialogSubmit } from "../../../utilities/form-data.helper";
import { STAFF_USER_ROLE } from "../../../const/user-role.const";
import dayjs from "dayjs";
import MaskedInput from "react-text-mask";
import {
  Image,
  Input,
  PasswordInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { PhoneNumberMask } from "../../../const/input-masking.const";
import ImageUpload from "../../../components/image-upload";
import { linkImage } from "../../../utilities/image.helper";
import FormErrorMessage from "../../../components/form-error-message";

type ViewStaffPropsType = {
  onClosed: (staffData?: StaffCreateEntity) => void;
};

const CreateStaff: FC<ViewStaffPropsType> = ({ onClosed }) => {
  const createStaffSchema = userRegisterSchemaFn(employeeModelSchema, false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm<z.infer<typeof createStaffSchema>>({
    resolver: zodResolver(createStaffSchema),
    mode: "onBlur",
    criteriaMode: "all",
  });

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    reset();
    onClosed && onClosed();
  };

  return (
    <div>
      <form
        onReset={handleReset}
        onSubmit={handleSubmit(DialogSubmit("create", dirtyFields, onClosed))}
        className="flex w-[650px] space-x-4"
      >
        <div className={"flex w-full flex-col"}>
          <div className={"flex w-full justify-between gap-5"}>
            <div
              style={{ width: 220 }}
              className={"flex h-full flex-col items-center space-y-1"}
            >
              <small className={"w-full text-[14px] font-semibold"}>Ảnh</small>
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
                      <Image
                        placeholder={true}
                        radius={4}
                        width={204}
                        height={204}
                        fit={"cover"}
                        className={"rounded border"}
                        src={linkImage(file)}
                        alt="user image"
                      />
                    )}
                  />
                )}
              />
              <FormErrorMessage errors={errors} name={"image"} />
            </div>
            <div className={"flex w-full flex-col"}>
              <TextInput
                label={"Tên đầy đủ"}
                placeholder="Nguyễn Văn A"
                {...register("name")}
              />
              <FormErrorMessage errors={errors} name={"name"} />
              <Controller
                render={({ field }) => (
                  <Select
                    label={"Chức vụ"}
                    placeholder="Chức vụ"
                    withAsterisk
                    data={[
                      {
                        value: STAFF_USER_ROLE.sale_staff,
                        label: "NV Kinh Doanh",
                      },
                      {
                        value: STAFF_USER_ROLE.technical_staff,
                        label: "NV Kĩ Thuật",
                      },
                    ]}
                    onChange={(e) => {
                      field.onChange(e);
                      field.onBlur();
                    }}
                    onBlur={field.onBlur}
                    defaultValue={field.value}
                  ></Select>
                )}
                name={"role"}
                control={control}
              />
              <FormErrorMessage errors={errors} name={"role"} />
              <PasswordInput
                placeholder="Mật khẩu"
                label="Mật khẩu"
                withAsterisk
                {...register("password")}
              />
              <FormErrorMessage errors={errors} name={"password"} />
            </div>
          </div>
          <div className="mt-1 flex w-full justify-between gap-4">
            <div className={"flex w-full flex-col gap-1"}>
              <Controller
                render={({ field }) => (
                  <Select
                    label={"Giới tính"}
                    withAsterisk
                    data={[
                      { value: GENDER.male, label: "Nam" },
                      { value: GENDER.female, label: "Nữ" },
                    ]}
                    onChange={(e) => {
                      field.onChange(e);
                      field.onBlur();
                    }}
                    onBlur={field.onBlur}
                    defaultValue={field.value}
                  ></Select>
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
                    placeholder="Trong độ tuổi 18-64"
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
            </div>
            <div className={"flex w-full flex-col gap-1"}>
              <Controller
                name={"phone"}
                control={control}
                render={({ field }) => (
                  <Input.Wrapper required id={"phone"} label={"SĐT"}>
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
            </div>
          </div>
          <Textarea
            autosize={false}
            rows={6}
            label={"Địa chỉ"}
            placeholder={"Địa chỉ"}
            {...register("address")}
            withAsterisk
          ></Textarea>
          <FormErrorMessage errors={errors} name={"address"} />
          <div className={"mt-3 flex justify-end"}>
            <DialogDetailAction
              mode={"create"}
              isDirty={isDirty}
              isValid={isValid}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateStaff;

import {
  Image,
  Input,
  PasswordInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaffModel, StaffUpdateEntity } from "../../../model/staff.model";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { PhoneNumberMask } from "../../../const/input-masking.const";
import MaskedInput from "react-text-mask";
import { FC, FormEvent } from "react";
import { employeeModelSchema } from "../../../validation/account-model.schema";
import { GENDER } from "../../../const/gender.const";
import { DialogSubmit } from "../../../utilities/form-data.helper";
import { STAFF_USER_ROLE } from "../../../const/user-role.const";
import DialogDetailAction from "../../../components/dialog-detail-action";
import { linkImage } from "../../../utilities/image.helper";
import ImageUpload from "../../../components/image-upload";
import FormErrorMessage from "../../../components/form-error-message";
import { idDbSchema, passwordSchema } from "../../../validation/field.schema";

type ViewStaffPropsType = {
  staffData: StaffModel;
  onClosed: (staffData?: StaffUpdateEntity) => void;
};

const ViewStaff: FC<ViewStaffPropsType> = ({ onClosed, staffData }) => {
  const createStaffSchema = employeeModelSchema.extend({
    id: idDbSchema,
    password: passwordSchema.optional().nullable(),
  });

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
    defaultValues: {
      ...staffData,
      // API response the password to be empty string...idk why but...yea...
      password: null,
      dateOfBirth: staffData.dateOfBirth
        ? dayjs(staffData.dateOfBirth).toDate()
        : undefined,
      role: staffData.role as unknown as
        | STAFF_USER_ROLE.sale_staff
        | STAFF_USER_ROLE.technical_staff,
    },
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
        onSubmit={handleSubmit(
          DialogSubmit("view", dirtyFields, onClosed, staffData)
        )}
        className="flex w-[650px] space-x-4"
      >
        <div className={"flex w-full flex-col"}>
          <div className={"flex w-full justify-between gap-2"}>
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
            </div>
            <div className={"w-full"}>
              <TextInput
                label={"Tên đầy đủ"}
                placeholder="Nguyễn Văn A"
                required
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
                {...register("password")}
              />
              <FormErrorMessage errors={errors} name={"password"} />
            </div>
          </div>
          <div className="flex w-full justify-between gap-5">
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
                    placeholder="In range of 18-64 years old"
                    label="Date of Birth"
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
                placeholder={"john_smith@domain.com"}
                {...register("email")}
              />
              <FormErrorMessage errors={errors} name={"email"} />
            </div>
          </div>
          <Textarea
            autosize={false}
            rows={6}
            label={"Address"}
            placeholder={"Full address"}
            {...register("address")}
            withAsterisk
          ></Textarea>
          <div className={"mt-3 flex justify-end"}>
            <DialogDetailAction
              mode={"view"}
              isDirty={isDirty && Object.keys(dirtyFields).length > 0}
              isValid={isValid}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ViewStaff;

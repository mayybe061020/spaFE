import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {StaffCreateEntity} from "../../../model/staff.model";
import {GENDER} from "../../../const/gender.const";
import {employeeModelSchema, userRegisterSchemaFn,} from "../../../validation/account-model.schema";
import {FC, FormEvent} from "react";
import DialogDetailAction from "../../../components/dialog-detail-action";
import {DialogSubmit} from "../../../utilities/form-data.helper";
import {STAFF_USER_ROLE} from "../../../const/user-role.const";
import BtnSingleUploader from "../../../components/btn-single-uploader";
import dayjs from "dayjs";
import {ACCEPTED_IMAGE_TYPES} from "../../../const/file.const";
import MaskedInput from "react-text-mask";
import {Avatar, Input, PasswordInput, Select, Textarea, TextInput} from "@mantine/core";
import {DatePicker} from "@mantine/dates";
import {PhoneNumberMask} from "../../../const/input-masking.const";

type ViewStaffPropsType = {
    onClosed: (staffData?: StaffCreateEntity) => void;
};

const CreateStaff: FC<ViewStaffPropsType> = ({onClosed}) => {
    const createStaffSchema = userRegisterSchemaFn(employeeModelSchema, false);

    const {
        control,
        register,
        handleSubmit,
        reset,
        watch,
        getValues,
        formState: {errors, isValid, isDirty, dirtyFields},
    } = useForm<z.infer<typeof createStaffSchema>>({
        resolver: zodResolver(createStaffSchema),
        mode: "onBlur",
        criteriaMode: "all",
        defaultValues: {
            gender: GENDER.other,
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
                onSubmit={handleSubmit(DialogSubmit("create", dirtyFields, onClosed))}
                className="flex w-[600px] space-x-4">
                <div className={"flex w-full flex-col"}>
                    <div className={"flex w-full justify-between gap-5"}>
                        <div style={{width: 220}} className={"flex flex-col items-center space-y-2 h-full"}>
                            <Controller
                                name={"image"}
                                control={control}
                                render={({field}) => (
                                    <BtnSingleUploader
                                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                        onChange={(f) => {
                                            field.onChange(f);
                                            field.onBlur();
                                        }}
                                        btnTitle={"Upload"}
                                        btnPosition={"after"}
                                        render={(f) =>
                                            (f && (
                                                <div className={"flex justify-center"}>
                                                    <div
                                                        className="mt-2 rounded-full border-2 border-gray-400 object-cover shadow-xl">
                                                        <Avatar
                                                            radius={60}
                                                            size={120}
                                                            src={URL.createObjectURL(f)}
                                                            alt="User Avatar"
                                                        />
                                                    </div>
                                                </div>
                                            )) ?? <></>
                                        }
                                    />
                                )}
                            />
                        </div>
                        <div className={"w-full"}>
                            <TextInput label={"Tên đầy đủ"} placeholder="Nguyễn Văn A" {...register("name")} />
                            <Controller
                                render={({field}) => (
                                    <Select label={"Chức vụ"}
                                            placeholder="Chức vụ"
                                            withAsterisk
                                            data={[
                                                {value: STAFF_USER_ROLE.sale_staff, label: "Sale staff"},
                                                {value: STAFF_USER_ROLE.technical_staff, label: "Technical staff"}
                                            ]}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                field.onBlur();
                                            }}
                                            onBlur={field.onBlur}
                                            defaultValue={field.value}>
                                    </Select>
                                )}
                                name={"role"}
                                control={control}
                            />
                            <PasswordInput
                                placeholder="Mật khẩu"
                                label="Mật khẩu"
                                withAsterisk
                                {...register("password")}
                            />
                        </div>
                    </div>
                    <div className="flex w-full justify-between gap-5">
                        <div className={"flex w-full flex-col gap-3"}>
                            <Controller
                                render={({field}) => (
                                    <Select label={"Giới tính"}
                                            withAsterisk
                                            data={[
                                                {value: GENDER.male, label: "Nam"},
                                                {value: GENDER.female, label: "Nữ"},
                                                {value: GENDER.other, label: "Khác"},
                                            ]}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                field.onBlur();
                                            }}
                                            onBlur={field.onBlur}
                                            defaultValue={field.value}>
                                    </Select>
                                )}
                                name={"gender"}
                                control={control}
                            />
                            <Controller
                                render={({field}) => (
                                    <DatePicker minDate={dayjs(new Date()).subtract(64, "years").toDate()}
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
                        </div>
                        <div className={"flex w-full flex-col gap-3"}>
                            <Controller
                                name={"phone"}
                                control={control}
                                render={({field}) => (
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
                            <TextInput
                                required
                                type="email"
                                label={"Email"}
                                id={"email"}
                                placeholder={"john_smith@domain.com"}
                                {...register("email")}
                            />
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
                    <div className={"flex justify-end mt-3"}>
                        <DialogDetailAction mode={"create"} isDirty={isDirty} isValid={isValid}/>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateStaff;

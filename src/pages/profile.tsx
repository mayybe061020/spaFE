import { AppPageInterface } from "../interfaces/app-page.interface";
import { USER_ROLE } from "../const/user-role.const";
import { useAuthUser } from "../store/auth-user.state";
import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Textarea,
  TextInput,
} from "@mantine/core";
import { z } from "zod";
import {
  addressSchema,
  emailSchema,
  fileUploadSchema,
  idDbSchema,
  imageTypeSchema,
  nameSchema,
  passwordSchema,
  phoneSchema,
} from "../validation/field.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUpload from "../components/image-upload";
import { linkImage } from "../utilities/image.helper";
import FormErrorMessage from "../components/form-error-message";
import MaskedInput from "react-text-mask";
import { PhoneNumberMask } from "../const/input-masking.const";
import { getUserDetail, updateUser } from "../services/user.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserModel, UserUpdateEntity } from "../model/user.model";
import { IErrorResponse } from "../interfaces/api.interface";
import {
  ShowFailedUpdate,
  ShowSuccessUpdate,
} from "../utilities/show-notification";
import { dirtyValues } from "../utilities/form-data.helper";
import { FormEvent } from "react";

const formSchema = z.object({
  id: idDbSchema,
  name: nameSchema,
  image: fileUploadSchema
    .and(imageTypeSchema)
    .or(z.string())
    .nullable()
    .optional(),
  email: emailSchema,
  address: addressSchema,
  phone: phoneSchema,
  password: passwordSchema.optional().nullable(),
});

const Profile: AppPageInterface = () => {
  const router = useRouter();

  // get the profile user from useAuthUser
  const authUser = useAuthUser((s) => s.user);

  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery(
    ["staff-detail", authUser],
    async () => {
      if (!authUser?.id) {
        return null;
      }

      return getUserDetail<UserModel>(authUser.id);
    },
    {
      onSuccess: (user) => resetFormWith(user),
    }
  );

  const updateMutation = useMutation<boolean, IErrorResponse, UserUpdateEntity>(
    ["update-user"],
    (payload) => updateUser(payload),
    {
      onSuccess: (result) => {
        if (result) {
          ShowSuccessUpdate();
          // close dialog and update to the list screen
          return refetch();
        }
        ShowFailedUpdate();
      },
      onError: (e) => {
        console.error(e);
        ShowFailedUpdate();
      },
    }
  );

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  if (!router.isReady || isLoading) {
    return <>loading...</>;
  }

  if (!profile) {
    // navigate to page 401 by router.
    void router.replace("/401");
    return <>navigating...</>;
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    const updateData = {
      ...dirtyValues(dirtyFields, data),
      id: data?.id,
    };
    // console.log(updateData);
    updateMutation.mutate(updateData);
  }

  function onResetForm(event: FormEvent<HTMLFormElement>) {
    event.stopPropagation();
    event.preventDefault();
    resetFormWith(profile);
  }

  function resetFormWith(user?: Partial<UserModel> | null) {
    reset({
      id: user?.id,
      image: user?.image,
      name: user?.name,
      email: user?.email,
      address: user?.address,
      phone: user?.phone,
      password: null,
    });
  }

  return (
    <form
      onReset={onResetForm}
      onSubmit={handleSubmit(onSubmit)}
      className={"container mx-auto p-4"}
    >
      <div className="flex flex-col items-center">
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
        <FormErrorMessage errors={errors} name={"image"} />
      </div>

      <div className="mx-auto flex w-11/12 max-w-[512px] flex-col space-y-2">
        <Divider my={8} />
        <TextInput
          size={"lg"}
          label={<small className={"font-semibold"}>Tên hiển thị</small>}
          variant={"default"}
          required
          {...register("name")}
        />
        <FormErrorMessage errors={errors} name={"name"} />

        <TextInput
          size={"lg"}
          label={<small className={"font-semibold"}>Email</small>}
          variant={"default"}
          required
          {...register("email")}
        />
        <FormErrorMessage errors={errors} name={"email"} />

        <Textarea
          size={"lg"}
          autosize={false}
          rows={4}
          label={<small className={"font-semibold"}>Địa chỉ</small>}
          variant={"default"}
          required
          {...register("address")}
        />
        <FormErrorMessage errors={errors} name={"address"} />

        <Controller
          name={"phone"}
          control={control}
          render={({ field }) => (
            <Input.Wrapper
              required
              id={"phone"}
              label={<small className={"font-semibold"}>Điện Thoại</small>}
            >
              <Input
                component={MaskedInput}
                mask={PhoneNumberMask}
                placeholder={"0127749999"}
                defaultValue={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                size={"lg"}
              />
            </Input.Wrapper>
          )}
        />
        <FormErrorMessage errors={errors} name={"phone"} />

        <Divider my={8} />
        <small>
          Cập nhật mật khẩu mới bằng cách nhập mật khẩu mới bên dưới. Nếu không
          muốn cập nhật, hãy để ô trống.
        </small>
        <TextInput
          label={<small className={"font-semibold"}>Mật khẩu mới</small>}
          type="password"
          placeholder={"3-30 ký tự"}
          size={"lg"}
          {...register("password")}
        />
        <FormErrorMessage errors={errors} name={"password"} />

        <Divider my={8} />

        <div className="my-8 flex min-h-20 space-x-4">
          {isDirty && (
            <>
              <Button
                size={"lg"}
                color={"red"}
                type={"reset"}
                variant={"subtle"}
              >
                Huỷ
              </Button>
              <Button
                disabled={!isValid}
                size={"lg"}
                color={"teal"}
                className={"flex-1"}
                type={"submit"}
              >
                Cập Nhật
              </Button>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

Profile.guarded = USER_ROLE.authenticated;

export default Profile;

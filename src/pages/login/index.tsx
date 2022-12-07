import React, { useState } from "react";
import { IconCheck, IconX } from "@tabler/icons";
import { useRouter } from "next/router";
import { AppPageInterface } from "../../interfaces/app-page.interface";
import Logo from "../../components/logo";
import { Button, Divider, Input, Notification } from "@mantine/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import Link from "next/link";
import { USER_ROLE } from "../../const/user-role.const";
import { useMutation } from "@tanstack/react-query";
import { IErrorResponse, ILoginResponse } from "../../interfaces/api.interface";
import useAccessToken from "../../store/access-token.atom";
import { useAuthUser } from "../../store/auth-user.state";
import { UserModel } from "../../model/user.model";
import { emailSchema, passwordSchema } from "../../validation/field.schema";
import { loginApi } from "../../services/user.service";

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const Login: AppPageInterface = () => {
  const [notify, setNotify] = useState<{
    color: string;
    context: React.ReactNode | string;
    icon: JSX.Element;
  } | null>(null);
  const authToken = useAccessToken();
  const authUser = useAuthUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const loginMutation = useMutation<
    ILoginResponse,
    IErrorResponse,
    z.infer<typeof loginSchema>
  >((payload) => loginApi(payload.email, payload.password), {
    onSuccess: (response) => {
      const userDecoded = authToken.setToken<UserModel>(response.accessToken);
      if (!userDecoded) {
        setNotify({
          icon: <IconX size={18} />,
          context: "There is some error. Please try again.",
          color: "red",
        });
        return;
      }
      // user login success. set the decoded to state.
      authUser.loginAs(userDecoded);
      setNotify({
        icon: <IconCheck size={18} />,
        context: "Login success! Redirecting you to homepage.",
        color: "teal",
      });
      // navigate to homepage
      void router.push("/");
    },
    onError: (error) => {
      let context = "Login failed, please try again.";

      if (error.status === 401) {
        context =
          error.error ?? error.error ?? "Email or password is incorrect!";
      }
      setNotify({
        icon: <IconX size={18} />,
        context,
        color: "red",
      });
    },
  });

  return (
    <div className="grid min-h-screen w-full place-items-center">
      <form
        onSubmit={handleSubmit((data) =>
          loginMutation.mutate({ email: data.email, password: data.password })
        )}
        className="flex w-11/12 flex-col rounded bg-white p-8 shadow-lg md:w-96"
      >
        <div className="flex justify-center">
          <Logo h={"3rem"} fontSize={"text-[1.75rem]"} />
        </div>

        <Divider my={16} />
        {notify && (
          <Notification
            className={"font-semibold"}
            disallowClose
            icon={notify.icon}
            color={notify.color}
          >
            {notify.context}
          </Notification>
        )}

        <label htmlFor={"email"} className="mt-4 mb-1">
          Email
        </label>
        <Input
          id={"email"}
          placeholder="nhập địa chỉ email..."
          {...register("email")}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => (
            <small className="text-red-600">{message}</small>
          )}
        />

        <label className="mt-4 mb-1" htmlFor="password">
          Password
        </label>
        <Input
          placeholder={"nhập mật khẩu..."}
          type={"password"}
          id={"password"}
          {...register("password")}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => (
            <small className="text-red-600">{message}</small>
          )}
        />

        <Button
          type={"submit"}
          disabled={!isValid || loginMutation.isLoading}
          sx={{
            background: "#A275E3",
            ":hover": {
              background: "#8f5dd7",
            },
          }}
          variant="filled"
          className="mt-4 mb-2"
        >
          Đăng Nhập
        </Button>

        <Link
          className="mt-2 mb-4 text-center text-xs text-blue-500"
          href={"/forgot-password"}
        >
          Quên mật khẩu?
        </Link>
      </form>
    </div>
  );
};

Login.useLayout = (p) => p;
Login.guarded = USER_ROLE.anonymous;

export default Login;

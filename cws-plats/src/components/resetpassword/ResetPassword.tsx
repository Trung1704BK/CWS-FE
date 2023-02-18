import { AuthLayout, Input } from "@/components/common";
import client, { getApiUrl } from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { verifyNewCodeSchema } from "@/lib/verifyemail/newcode/schema";
import { selectAuth } from "@/store/auth";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { Button, Heading } from "@chakra-ui/react";
function Index() {
  const verifyResetPasswordValidate = useMemo(() => verifyNewCodeSchema, []);
  const router = useRouter();
  const authState = useSelector(selectAuth);

  const resetPasswordAsync = async (
    payload: z.infer<typeof verifyResetPasswordValidate>
  ) => {
    const response = await client.post<BaseResponse>(
      `${getApiUrl("user")}/reset-password`,
      payload
    );
    return handleResponse(response);
  };

  const formik = useFormik<z.infer<typeof verifyResetPasswordValidate>>({
    initialValues: {
      email: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: toFormikValidationSchema(verifyResetPasswordValidate),
    onSubmit: async (values) => {
      toast.promise(resetPasswordAsync(values), {
        loading: "Resetting Password",
        success: (data) => {
          router.push({
            pathname: "/verify-email",
            query: { email: values.email },
          });
          return data?.message || "";
        },
        error: (err) => JSON.stringify(err.message),
      });
    },
  });
  //Listen to selector
  useEffect(() => {
    const isLogin = authState.user !== null;
    if (isLogin) {
      router.push("/");
    }
  });
  return (
    <div className="-mt-2 sm:mt-5  ">
      <Heading className="xs:text-2xl text-center text-sm">
        Reset Password
      </Heading>
      <div className="xs:w-[490px] w-full">
        <p className="mt-4 text-sm text-red-500">
          Enter your email address, so we can send you instructions to help you
          reset your password.
        </p>
      </div>
      <form className="bg-slate-50a" onSubmit={formik.handleSubmit}>
        <div className="mt-2"></div>
        <div className="">
          <label
            className="mb-2 block text-sm font-semibold text-gray-500"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
            className="xs:w-[490px]      mb-3 block  appearance-none rounded border-2 border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white"
            autoComplete="off"
            autoFocus
            id="email"
            type="text"
            placeholder="Enter email address"
          />
        </div>
        <Button type="submit" className="xs:w-[490px] w-full">
          <span className="text-text_button text-size_button font-bold ">
            Send email
          </span>
        </Button>
      </form>
    </div>
  );
}
Index.title = "Resetpassword";
Index.layout = AuthLayout;

export default Index;

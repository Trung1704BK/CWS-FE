import client, { getApiUrl } from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { verifyEmailSchema } from "@/lib/verifyemail/schema";
import { selectAuth } from "@/store/auth";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { AppLink, AuthLayout } from "../common";
function Index() {
  const verifyemailValidate = useMemo(() => verifyEmailSchema, []);
  const router = useRouter();
  const authState = useSelector(selectAuth);

  const verifyemailAsync = async (
    payload: z.infer<typeof verifyemailValidate>
  ) => {
    const response = await client.post<BaseResponse>(
      `${getApiUrl("user")}/register-client-cws/confirm-email`,
      payload
    );
    return handleResponse(response);
  };

  const formik = useFormik<z.infer<typeof verifyemailValidate>>({
    initialValues: {
      email: "",
      confirmation_code: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: toFormikValidationSchema(verifyemailValidate),
    onSubmit: async (values) => {
      toast.promise(verifyemailAsync(values), {
        loading: "",
        success: (data) => {
          router.push({
            pathname: "/login",
            query: { email: values.email },
          });
          return data?.message || "";
        },

        error: (err) => {
          if (err instanceof AxiosError) {
            return err.response?.data.message || "Something went wrong";
          }

          return "Something went wrong";
        },
      });
    },
  });

  //Listen to selector
  useEffect(() => {
    const isLogin = authState.user !== null;
    if (isLogin) {
      router.push("/");
    }
  }, [authState.user, router]);

  useEffect(() => {
    if (router.query.email) {
      formik.setFieldValue("email", router.query.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.email]);

  return (
    <Box>
      <Spacer p={2} />
      <Center>
        <Heading size="md">Verify Email</Heading>
      </Center>
      <Spacer p={4} />
      <form className="bg-slate-50a" onSubmit={formik.handleSubmit}>
        <Card className="xs:w-[440px] grid w-[300px] space-y-4 sm:w-[440px] md:w-[440px]">
          <CardBody>
            <Stack gap={2}>
              <FormControl isRequired isInvalid={!!formik.errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Enter email address"
                  {...formik.getFieldProps("email")}
                />
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!formik.errors.confirmation_code}
              >
                <FormLabel>Confirmination Code</FormLabel>
                <Input
                  placeholder="Enter confirmation code"
                  {...formik.getFieldProps("confirmation_code")}
                />
              </FormControl>

              <Flex justify="flex-end">
                <AppLink href="/verify-email/newcode">
                  Resend Confirmation
                </AppLink>
              </Flex>

              <Button
                type="submit"
                isLoading={formik.isSubmitting}
                colorScheme="blue"
              >
                Verify
              </Button>
            </Stack>
          </CardBody>
        </Card>
      </form>
    </Box>
  );
}

export default Index;

Index.layout = AuthLayout;
Index.title = "VerifyEmail";

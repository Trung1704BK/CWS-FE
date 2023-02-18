import { AuthLayout } from "@/components/common";
import client, { getApiUrl } from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { verifyNewCodeSchema } from "@/lib/verifyemail/newcode/schema";
import { selectAuth } from "@/store/auth";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormHelperText,
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

function Index() {
  const verifyNewCodeValidate = useMemo(() => verifyNewCodeSchema, []);
  const router = useRouter();
  const authState = useSelector(selectAuth);

  const newCodeAsync = async (
    payload: z.infer<typeof verifyNewCodeValidate>
  ) => {
    const response = await client.post<BaseResponse>(
      `${getApiUrl("user")}/register-client-cws/resend-confirm-email`,
      payload
    );
    return handleResponse(response);
  };
  const formik = useFormik<z.infer<typeof verifyNewCodeValidate>>({
    initialValues: {
      email: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: toFormikValidationSchema(verifyNewCodeValidate),
    onSubmit: async (values) => {
      toast.promise(newCodeAsync(values), {
        loading: "Sending ",
        success: (data) => {
          router.push({
            pathname: "/verify-email",
            query: { email: values.email },
          });
          return data?.message || "";
        },

        error: (err) => {
          if (err instanceof AxiosError) {
            return err.response?.data?.message || "Something went wrong";
          }

          return err.response;
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

  return (
    <Box>
      <Spacer p={2} />
      <Center>
        <Heading size="md">Verify Email</Heading>
      </Center>
      <Spacer p={4} />
      <form className="bg-slate-50a" onSubmit={formik.handleSubmit}>
        <Card>
          <CardBody>
            <Stack gap={2}>
              <FormControl isInvalid={!!formik.errors.email} isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  placeholder="Enter email address"
                  {...formik.getFieldProps("email")}
                />
                <FormHelperText>
                  Enter your email, so we will send new code to complete sign up
                  progress.
                </FormHelperText>
              </FormControl>

              <Spacer />

              <Button type="submit" colorScheme="blue">
                Send email
              </Button>
            </Stack>
          </CardBody>
        </Card>
      </form>
    </Box>
  );
}
Index.title = "New Code";
Index.layout = AuthLayout;
export default Index;

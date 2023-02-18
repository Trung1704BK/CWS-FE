import AuthLayout from "@/components/common/Layout/AuthLayout";
import client, { getApiUrl } from "@/core/client";
import { BaseResponse } from "@/core/handleResponse";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { registerSchema } from "../../lib/register/schema";
import { selectAuth } from "../../store/auth";
import { AppLink } from "../common";
function Index() {
  const registerValidate = useMemo(() => registerSchema, []);
  const router = useRouter();
  const authState = useSelector(selectAuth);

  const registerAsync = async (payload: z.infer<typeof registerValidate>) => {
    const response = await client.post<BaseResponse>(
      `${getApiUrl("user")}/register-client-cws`,
      payload
    );

    return response;
  };

  const formik = useFormik<z.infer<typeof registerValidate>>({
    initialValues: {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: toFormikValidationSchema(registerValidate),
    onSubmit: async (values) => {
      toast.promise(registerAsync(values), {
        loading: "Registering...",
        success: (data) => {
          router.push({
            pathname: "/verify-email",
            query: { email: values.email },
          });

          return data?.data.message || "Register success";
        },
        error: (err: any) => {
          console.log("test", err);
          console.log("check", Object.keys(err.error));
          Object.keys(err.error).forEach((key) => {
            formik.setFieldError(key, err.error[key]);
          });
          return "Register failed";
        },
      });
    },
  });

  // listen to selector
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
        <Heading size="md">Register an account</Heading>
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
                {formik.errors.email && (
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={!!formik.errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter name"
                  {...formik.getFieldProps("name")}
                />
                {formik.errors.name && (
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={!!formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...formik.getFieldProps("password")}
                />
                {formik.errors.password && (
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!formik.errors.password_confirmation}
              >
                <FormLabel>Confirm password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...formik.getFieldProps("password_confirmation")}
                />
                {formik.errors.password_confirmation && (
                  <FormErrorMessage>
                    {formik.errors.password_confirmation}
                  </FormErrorMessage>
                )}
              </FormControl>

              <Box pt={2}>
                <Text>
                  By Signing up, you agree to our{" "}
                  <Link href="/terms">
                    <Text as="span" color="blue.500">
                      Terms of Service
                    </Text>
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy">
                    <Text as="span" color="blue.500">
                      Privacy Policy
                    </Text>
                  </Link>
                </Text>
              </Box>

              <Button
                type="submit"
                isLoading={formik.isSubmitting}
                colorScheme="blue"
              >
                Sign up
              </Button>

              <Center pt={2}>
                <AppLink href="/login">Already have an account?</AppLink>
              </Center>
            </Stack>
          </CardBody>
        </Card>
      </form>
    </Box>
  );
}

Index.title = "Register";
Index.layout = AuthLayout;

export default Index;

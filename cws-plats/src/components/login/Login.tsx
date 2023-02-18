import client, { getApiUrl } from "@/core/client";
import { BaseResponse, handleResponse } from "@/core/handleResponse";
import { loginSchema } from "@/lib/login/schema";
import { login as storeLogin, selectIsAuthenticated } from "@/store/auth";
import { LoginResponse } from "@/store/auth/types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { useToggle } from "react-use";
import { toFormikValidationSchema } from "zod-formik-adapter";
// import Card from "../common/Card/Card";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Spinner,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { AppLink, AuthLayout } from "../common";

function Index() {
  const loginValidate = useMemo(() => loginSchema, []);
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const [isSubmitted, setIsSubmitted] = useToggle(false);

  const loginAsync = async (payload: { email: string; password: string }) => {
    const response = await client.post<BaseResponse<LoginResponse>>(
      getApiUrl("user") + "/login-cms",
      payload
    );

    dispatch(storeLogin(response.data.data));

    console.log(response.data);

    return handleResponse(response);
  };

  const login = async (values: { email: string; password: string }) => {
    try {
      const data = await loginAsync(values);
      if (data.id !== null) {
        router.push("/");
      }

      toast.success(`Welcome back, ${data.name}!`);
    } catch (error: any) {
      toast.error(error?.message || "Email or password is incorrect");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: (router.query.email as string) || "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: isSubmitted,
    validationSchema: toFormikValidationSchema(loginValidate),
    onSubmit: async () => {
      setIsSubmitted(true);

      await login({
        email: formik.values.email,
        password: formik.values.password,
      });
    },
  });

  if (isAuthenticated) {
    router.push("/");
  }
  return (
    <Box>
      <Spacer p={2} />
      <Center>
        <Heading size="md">Login to your account</Heading>
      </Center>
      <Spacer p={4} />
      <form className="bg-slate-50" onSubmit={formik.handleSubmit}>
        <Card className="xs:w-[440px] grid w-[300px] space-y-4 sm:w-[440px] md:w-[440px]">
          <CardBody>
            <Stack gap={2}>
              <FormControl isRequired isInvalid={!!formik.errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Enter email address"
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...formik.getFieldProps("password")}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>

              <Flex justify="between" pt={1} alignItems="center" gap={1}>
                <FormControl display="flex" alignItems="center" gap={2}>
                  <Switch id="rememberMe" colorScheme="blue" />
                  <FormLabel mb={0} htmlFor="rememberMe">
                    Remember me
                  </FormLabel>
                </FormControl>

                {/* <Text whiteSpace="nowrap">
                  <AppLink href="#">Forgot password?</AppLink>
                </Text> */}
              </Flex>

              <Button
                type="submit"
                isLoading={formik.isSubmitting}
                loadingText="Logging in..."
                colorScheme="blue"
              >
                {formik.isSubmitting ? <Spinner /> : "Login"}
              </Button>

              <Spacer p={2} />
              <Center>
                <AppLink href="/register">
                  <Text>Don&apos;t have an account?</Text>
                </AppLink>
              </Center>
            </Stack>
          </CardBody>
        </Card>
      </form>
    </Box>
  );
}

export default Index;

Index.layout = AuthLayout;
Index.title = "Login";

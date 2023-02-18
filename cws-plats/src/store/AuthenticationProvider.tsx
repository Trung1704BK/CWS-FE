import React, { memo, useEffect } from "react";
import { selectIsAuthenticated } from "./auth";
import { useAppSelector } from "./store";
import { useRouter } from "next/router";
import { Center, Spinner, Stack } from "@chakra-ui/react";

function AuthenticationProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();
  const [isInit, setIsInit] = React.useState(false);

  useEffect(() => {
    (async () => {
      const paths = [
        "/login",
        "/register",
        "/verifyemail",
        "/newcode",
        "/reset-password",
      ];

      const isPath = paths.some((path) => router.pathname.match(path));
      if (!isPath && !isAuthenticated) {
        setIsInit(() => false);
        await router.push("/login", undefined, { shallow: true });
      }

      setTimeout(() => {
        setIsInit(() => true);
      }, 500);
    })();
  }, [isAuthenticated, router]);

  return (
    <>
      {isInit ? (
        children
      ) : (
        <Stack
          h="calc(100vh)"
          w="100%"
          bgColor="gray.700"
          justifyContent="center"
          alignItems="center"
        >
          <Center>
            <Spinner color="white" size="xl" />
          </Center>
        </Stack>
      )}
    </>
  );
}

export default memo(AuthenticationProvider);

import { Box, Center, Container, Img } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactElement;
};

function AuthLayout({ children }: Props) {
  return (
    <Box pt={20} bgColor="gray.800" h="calc(100vh)" textColor="white">
      <Center>
        <Link href="/login">
          <Img src="/assets/logo-light-blue.svg" height={16} alt="" />
        </Link>
      </Center>
      <Container maxW="5xl" centerContent>
        {children}
      </Container>
    </Box>
  );
}

export default AuthLayout;

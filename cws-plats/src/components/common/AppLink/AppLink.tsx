import { Link, LinkProps, Text } from "@chakra-ui/react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { memo } from "react";

interface AppLinkProps extends LinkProps {
  nextLinkProps?: NextLinkProps;
}

function AppLink({ href, nextLinkProps, children, ...props }: AppLinkProps) {
  return (
    <NextLink {...nextLinkProps} href={href || "#"} passHref legacyBehavior>
      <Link {...props}>
        <Text as="span" color="blue.500">
          {children}
        </Text>
      </Link>
    </NextLink>
  );
}

export default memo(AppLink);

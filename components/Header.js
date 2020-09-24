import Link from "next/link";
import { Box, Image, Input } from "@chakra-ui/core";
import ActiveLink from "./../lib/ActiveLink";

export default function Header() {
  return (
    <Box mx="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* SEARCH BOX */}
        {/* <Box display="flex" alignItems="center">
          <Input placeholder="Search by City" size="lg" ml="10px" />
        </Box> */}

        <Box>
          {/* LOGO */}
          <Link href="/">
            <a>
              <Image src="/logo.png" alt="Logo" size="100px" />
            </a>
          </Link>
        </Box>

        {/* USER ACTION */}
        <Box>
          <ActiveLink href="/">Home</ActiveLink>
          <ActiveLink href="/explore">Explore</ActiveLink>
          <ActiveLink href="/about">About</ActiveLink>
        </Box>
      </Box>
    </Box>
  );
}

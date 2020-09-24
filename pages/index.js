import { Box, Image, Skeleton } from "@chakra-ui/core";

export default function index() {
  return (
    <Box>
      <Skeleton>
        <Image objectFit="cover" height="90vh" width="100vw" />
      </Skeleton>
    </Box>
  );
}

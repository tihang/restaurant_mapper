import { Image, PseudoBox, Text } from "@chakra-ui/core";
import { useRouter } from "next/router";

export default function FeaturedCard(props) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };
  return (
    <PseudoBox
      onClick={handleClick}
      width={400}
      height={400}
      border="1px"
      borderColor="#E2E8F0"
      p={3}
      m={4}
      shadow="sm"
      transition="transform .3s"
      _hover={{
        shadow: "xl",
        transform: "translate(0px, -5px)",
        cursor: "pointer",
      }}
    >
      <Text as="h2" fontSize="xl" p={6} textAlign="center">
        {props.name}
      </Text>
      <Image
        objectFit="cover"
        width="100%"
        height="auto"
        src={props.image_url}
      ></Image>
    </PseudoBox>
  );
}

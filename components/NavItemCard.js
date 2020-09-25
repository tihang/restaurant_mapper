import { Badge, Box, Text, Image, Button, Skeleton } from "@chakra-ui/core";
import styled from "@emotion/styled";
import ReactStars from "react-rating-stars-component";
import Link from "next/link";

const StyledBox = styled(Box)`
  background-color: ${(props) =>
    props.business.id === props.focused.id ? "#E2E8F0" : null};

  &:hover {
    background-color: #e2e8f0;
  }
`;

const NavItemCard = ({ business, focused, setFocused, index }) => {
  const fieldRef = React.useRef(null);

  React.useEffect(() => {
    if (focused.id === business.id && focused.scroll === true) {
      fieldRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [focused.id]);

  return (
    <React.Fragment>
      <StyledBox
        ref={fieldRef}
        business={business}
        focused={focused}
        onMouseEnter={() => setFocused({ id: business.id })}
        borderWidth="1px"
      >
        {/* TOP PART */}
        <Box p="8" d="flex" justifyContent="space-between">
          <Box>
            <Box mt="1" fontWeight="semibold" fontSize="1.1rem" as="h2">
              {index + ". " + business.name}
            </Box>

            <Box>
              <Box pt="2">
                <ReactStars
                  value={business.rating}
                  count={5}
                  edit={false}
                  size={20}
                ></ReactStars>

                <Box
                  color="green.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textDecoration="underline"
                >
                  <Link
                    href={`/detail/[id]`}
                    as={`/detail/${encodeURIComponent(business.id)}`}
                  >
                    {business.review_count + " reviews"}
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>

          <Image
            src={business.image_url}
            alt=""
            objectFit="cover"
            size="150px"
            fallbackSrc={`https://via.placeholder.com/150`}
          ></Image>
        </Box>

        {/* BOTTOM PART */}
        <Box
          d="flex"
          flexDirection="row-reverse"
          justifyContent="space-between"
          px="8"
          pb="4"
        >
          <Box d="flex" flexDir="column">
            {/* PRICE BADGE */}
            <Badge alignSelf="flex-end" variantColor="green" variant="solid">
              <Text letterSpacing={5}>{business.price}</Text>
            </Badge>

            <Box d="flex" flexDir="column" alignSelf="flex-end" mt={2}>
              {business.transactions &&
                business.transactions.map((transaction, i) => {
                  return (
                    <Text
                      key={i}
                      alignSelf="flex-end"
                      color="green.500"
                      fontSize="xs"
                    >
                      {transaction.toUpperCase()}
                      {transaction.toUpperCase() === "DELIVERY" ? (
                        <Image
                          src="/images/delivery-man.svg"
                          d="inline-block"
                          ml="10px"
                          size={4}
                          alt="-"
                        />
                      ) : (
                        <Image
                          src="/images/pickup-bag.svg"
                          d="inline-block"
                          ml="10px"
                          size={4}
                          alt="-"
                        />
                      )}
                    </Text>
                  );
                })}
            </Box>
          </Box>

          <Box>
            <Link
              href={`/detail/[id]`}
              as={`/detail/${encodeURIComponent(business.id)}`}
            >
              <Button width="90px" variantColor="pink">
                Visit
              </Button>
            </Link>
          </Box>
        </Box>
      </StyledBox>
    </React.Fragment>
  );
};

export default NavItemCard;

import { withRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";
import moment from "moment";
import ReactStars from "react-rating-stars-component";
import { CgCheckO } from "react-icons/cg";

import { fetcher } from "./../../lib/fetcher";
import {
  Badge,
  Box,
  Divider,
  Flex,
  Grid,
  Icon,
  IconButton,
  Image,
  PseudoBox,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/core";

function Details({ router }) {
  //UTILS
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //SWR QUERY FOR BUSINESS DETAIL
  const queryString = `/api/restaurant-detail?id=${router.query.id}`;
  const { data } = useSWR(queryString, fetcher);

  //SWR QUERY FOR BUSINESS REVIEW
  const reviewsQueryString = `/api/restaurant-review?id=${router.query.id}`;
  const { data: reviewsData } = useSWR(reviewsQueryString, fetcher);

  if (!data && !reviewsData) {
    return (
      <Box d="flex" justifyContent="center" mt="40px">
        <Spinner size="xl" color="green.300" />
      </Box>
    );
  }

  if (data && reviewsData) {
    return (
      <Box d="flex" flexDir="column" maxW="1140px" margin="0 auto" p="20px">
        <Head>
          <title>{data.name}</title>
        </Head>
        {/* PHOTO BOX */}
        <PseudoBox
          onClick={() => router.back()}
          _hover={{
            cursor: "pointer",
            color: "purple.500",
            textDecor: "underline",
          }}
        >
          <Stack isInline>
            <Icon size="24px" name="arrow-back" />
            <Text as="p" fontWeight="600">
              Back
            </Text>
          </Stack>
        </PseudoBox>
        <Box d="flex" justifyContent="center" mt={3}>
          {data &&
            data.photos.map((url) => {
              return (
                <Image
                  key={url}
                  size="360px"
                  objectFit="cover"
                  p="1"
                  borderRadius="20px"
                  src={url}
                ></Image>
              );
            })}
        </Box>
        <Box>
          {/* RESTAURANT NAME */}
          <Text
            margin={4}
            as="h1"
            fontFamily="Poppins"
            fontWeight="900"
            fontSize="5xl"
            textAlign="center"
          >
            {data.name}
            {/* RESTAURANT NAME */}
            <Box d="inline-flex" alignItems="center">
              {/* VERIFIED SIGN */}
              <CgCheckO
                style={{
                  display: "inline",
                  marginRight: "3px",
                  marginLeft: "15px",
                }}
                color={data.is_claimed ? "green" : "red"}
                size="24px"
                d="inline"
              />
              <Text
                as="span"
                fontWeight="600"
                fontSize="xs"
                color="grey"
                textAlign="center"
              >
                {data.is_claimed ? "Verified" : "Not Verified"}
              </Text>
            </Box>
            <Box
              d="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
            >
              {/* STARS */}
              <ReactStars
                edit={false}
                size={35}
                value={data.rating}
              ></ReactStars>

              <Text as="span" fontWeight="600" fontSize="sm">
                {data.review_count + " reviews"}
              </Text>
            </Box>
          </Text>

          <SimpleGrid columns={3}>
            {/* RESTAURANT HIGHLIGHTS BOX */}
            <Box>
              <Text
                fontSize="lg"
                fontFamily="Poppins"
                textDecoration="underline"
              >
                Highlights
              </Text>
              <Stack d="flex" flexWrap="wrap" isInline mt={2}>
                {data.categories.map((category, i) => (
                  <Badge
                    key={i}
                    my={1}
                    fontSize="sm"
                    variantColor="purple"
                    variant="outline"
                  >
                    {category.title}
                  </Badge>
                ))}
              </Stack>
            </Box>
            {/* ADDRESS DESC BOX */}
            <Box
              d="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
            >
              <Text as="h1" fontSize="xl" textAlign="center" fontWeight="600">
                {data.location.address1}
              </Text>
              <Text as="h1" fontSize="xl" textAlign="center" fontWeight="600">
                {data.location.address2}
              </Text>
              <Text as="h2" fontSize="xl" textAlign="center" fontWeight="600">
                {data.location.address3}
              </Text>
              <Text as="h2" fontSize="lg" textAlign="center" fontWeight="600">
                {data.location.city}
              </Text>
              <Text as="span" fontSize="lg" textAlign="center" fontWeight="600">
                {data.location.zip_code}
              </Text>
              <Text
                as="span"
                fontSize="md"
                textAlign="center"
                fontWeight="600"
                color="grey"
              >
                {data.location.state}
              </Text>
            </Box>
            {/* OPEN/CLOSED flag */}
            {/* CHECK FOR DATA FIRST FIRST::: NOTE BECAUSE SOME DATA DONT HAVE data.hours */}
            {data.hours && (
              <Box d="flex" justifyContent="flex-end">
                <Box
                  color={data.hours[0].is_open_now ? "green.500" : "red.500"}
                  fontWeight="semibold"
                  fontFamily="poppins"
                  letterSpacing="wide"
                  fontSize="lg"
                  textTransform="uppercase"
                  ml="2"
                >
                  {"Is " +
                    (data.hours[0].is_open_now ? "OPEN" : "CLOSED") +
                    " right now"}
                </Box>
              </Box>
            )}
          </SimpleGrid>
        </Box>
        {/* REVIEW SECTION */}
        <Grid gridTemplateColumns="auto 150px">
          <Flex flexDirection="column" my={8}>
            {/* REVIEW SECTION HEADING*/}
            <Text as="h2" fontSize="xl" fontFamily="Poppins" mb={8}>
              REVIEWS
              <Tooltip
                hasArrow
                label="Due to API call limitations can only show 3 reviews"
                placement="top"
              >
                <Icon mx={4} color="gray.300" name="warning" />
              </Tooltip>
            </Text>

            {/* MAP OVER REVIEWS */}
            {reviewsData.reviews.map((review) => {
              return (
                <Grid
                  key={review.id}
                  gridTemplateColumns="100px auto"
                  mr={8}
                  mb={8}
                  p={4}
                  shadow="md"
                >
                  {/* LEFT FLEX BOX with avatar and name */}
                  <Box
                    d="flex"
                    flexDir="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image
                      rounded="full"
                      objectFit="cover"
                      size="60px"
                      src={
                        review.user.image_url
                          ? review.user.image_url
                          : "/images/user.jpg"
                      }
                      alt={review.user.name}
                    />

                    <Text
                      textAlign="center"
                      wordBreak="break-word"
                      fontWeight="600"
                    >
                      {review.user.name}
                    </Text>
                  </Box>

                  {/* RIGHT FLEX BOX */}
                  <Box pl={4}>
                    <Text fontSize="sm">
                      {moment(review.time_created).format("MMMM Do YYYY")}
                    </Text>
                    <ReactStars value={5} edit={false} size={24}></ReactStars>
                    <Text as="p">{review.text}</Text>
                  </Box>
                </Grid>
              );
            })}
          </Flex>
          {/* REVIEW SECTION END*/}

          {/* MAP OVER DATA AND SHOW OPEN HOURS */}
          <Flex flexDir="column" alignSelf="flex-end">
            <Text fontSize="lg" fontFamily="Poppins" textDecoration="underline">
              Hours
            </Text>
            {/* CHECK FOR DATA FIRST FIRST::: NOTE BECAUSE SOME DATA DONT HAVE data.hours */}
            {data.hours &&
              data.hours[0].open.map((open, i) => {
                return (
                  <React.Fragment key={i}>
                    <Text fontWeight="600">{week[open.day]}</Text>
                    <Text fontSize="sm">
                      Open: {moment(open.start, "hhmm").format("LT")}
                    </Text>
                    <Text fontSize="sm">
                      Close : {moment(open.end, "hhmm").format("LT")}
                    </Text>
                    <Divider orientation="horizontal" borderColor="red.200" />
                  </React.Fragment>
                );
              })}
          </Flex>
        </Grid>
      </Box>
    );
  }

  return null;
}

export default withRouter(Details);

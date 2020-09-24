import { withRouter } from "next/router";
import useSWR from "swr";
import moment from "moment";
import { fetcher } from "./../../lib/fetcher";

import {
  Badge,
  Box,
  Divider,
  Flex,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/core";
import { CgCheckO } from "react-icons/cg";
import Head from "next/head";

function Details({ router }) {
  //UTILS
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const queryString = `/api/restaurant-detail?id=${router.query.id}`;

  const { data, error } = useSWR(queryString, fetcher);

  if (!data) {
    return (
      <Box d="flex" justifyContent="center" mt="40px">
        <Spinner size="xl" color="green.300" />
      </Box>
    );
  }

  if (data) {
    return (
      <Box d="flex" flexDir="column" maxW="1140px" margin="0 auto" p="20px">
        <Head>
          <title>{data.name}</title>
        </Head>
        {/* PHOTO BOX */}
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
            {/* VERIFIED SIGN */}
            <Box d="inline-flex" alignItems="center">
              <CgCheckO
                style={{ display: "inline", marginLeft: "10px" }}
                color={data.is_claimed ? "green" : "red"}
                size="28px"
                d="inline"
              />
              <Text as="span" fontWeight="600" fontSize="xs" textAlign="center">
                {data.is_claimed ? "Verified" : "Not Verified"}
              </Text>
            </Box>
          </Text>

          <Stack marginTop={4} isInline>
            {data.categories.map((category) => (
              <Badge fontSize="sm" variantColor="purple" variant="outline">
                {category.title}
              </Badge>
            ))}
          </Stack>
        </Box>
        {/* MAP OVER DATA AND SHOW OPEN HOURS */}
        <Flex flexDir="column" alignSelf="flex-end">
          {data.hours[0].open.map((open) => {
            return (
              <React.Fragment>
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
      </Box>
    );
  }

  return null;
}

export default withRouter(Details);

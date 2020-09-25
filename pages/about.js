import { Box, Code, Icon, List, ListItem, Text } from "@chakra-ui/core";
import React from "react";

export default function about() {
  return (
    <Box maxW="1040px" m="3rem auto" px={10}>
      <Code
        as="h1"
        fontSize="4xl"
        fontFamily="monospace"
        children="Thanks for visiting"
      ></Code>

      <Text as="h1" fontSize="4xl"></Text>
      <hr />

      <Box my={10}>
        <Text fontSize="xl" fontWeight="600" mt={10}>
          This is a concept app I built for easily geolocating and exploring
          restaurants around the world.
        </Text>

        <Text fontSize="md" fontWeight="600" mt={6}>
          Some highlights and credits:
        </Text>
        <List styleType="disc" mt={2}>
          <ListItem>
            API & Data Provider: <strong>YELP</strong>
          </ListItem>
          <ListItem>
            MAP API Provider: <strong>Mapbox</strong>
          </ListItem>
          <ListItem>
            Frontend: <strong>React with Next.js</strong>
          </ListItem>
          <ListItem>
            Styling: <strong>Chakra UI and Emotion</strong>
          </ListItem>
          <ListItem>
            Photos & Assets: <strong>Unsplash and unDraw</strong>
          </ListItem>
          <ListItem>
            Backend: <strong>Next with Vercel Serverless Functions</strong>
          </ListItem>
          <ListItem>
            Deployment: <strong>Vercel</strong>
          </ListItem>
        </List>
      </Box>

      <Text fontSize="md" fontWeight="600" mt={6}>
        <a href="https://github.com/tihang/restaurant_mapper" target="_blank">
          Link to the project on Github
          <Icon
            name="external-link"
            mx={3}
            mb={1}
            _hover={{ color: "green" }}
          ></Icon>
        </a>
      </Text>
    </Box>
  );
}

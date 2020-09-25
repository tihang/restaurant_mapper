import Axios from "axios";
import { useRouter } from "next/router";
import useStore from "../store/index";
import {
  Box,
  Button,
  Collapse,
  Flex,
  FormControl,
  Image,
  Input,
  PseudoBox,
  Text,
} from "@chakra-ui/core";

export default function Index() {
  const router = useRouter();
  const { latitude, longitude, setLatitude, setLongitude } = useStore();
  const [show, setShow] = React.useState(false);
  const [cityQuery, setCityQuery] = React.useState("");
  const [queryData, setQueryData] = React.useState();

  const token =
    "pk.eyJ1IjoidGloYW5ncmFpIiwiYSI6ImNrZjdpeWo3dTAydDIycW13amZ1eHFsN3cifQ.WjCkBLYLss_6N67swg9L7w";

  React.useEffect(() => {
    // THIS FUNCTION GETS THE CITY RECOMMENDATION and DISPLAYS IT
    async function getCityList() {
      if (cityQuery.length > 3) {
        const { data } = await Axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityQuery}.json?&access_token=${token}`
        );
        setQueryData(data);
        if (data) {
          setShow(true);
        }
      }
      if (cityQuery.length < 3) {
        setShow(false);
      }
    }
    getCityList();
    console.log(cityQuery);
    console.log(queryData);
  }, [cityQuery]);

  const handleSearchClick = (lat, long) => {
    setLatitude(lat);
    setLongitude(long);

    router.push("/explore");
  };

  return (
    <Box>
      <Box d="flex" flexDir="column" width="100%" height="100vh">
        <Box marginRight={55} alignSelf="center">
          <Text as="h1" fontSize="lg" fontFamily="Poppins">
            Lets find the best.
          </Text>
          <Text as="h1" fontSize="md" textAlign="end" fontFamily="Poppins">
            Around the world.
          </Text>
          <Image src="/images/food_1.svg" size="xs"></Image>
        </Box>
        <FormControl d="flex" mt={0} flexDir="column" alignItems="center">
          {/* SEARCH BTN AND INPUT */}
          <Box d="flex" justifyContent="center" alignItems="center">
            <Input
              width="440px"
              height="70px"
              borderRadius="28px"
              size="lg"
              px={10}
              mx={6}
              _hover={{ borderColor: "purple.200" }}
              _focus={{
                outline: "none",
                bg: "white",
                borderColor: "purple.400",
              }}
              placeholder="Search by city"
              onChange={(e) => setCityQuery(e.target.value)}
            ></Input>
            <Button
              width="100px"
              height="50px"
              borderRadius="30px"
              backgroundColor="purple.200"
            >
              Search
            </Button>
          </Box>
          <Box>
            <Collapse
              ml={-95}
              borderColor="#E2E8F0"
              width="420px"
              isOpen={show}
              overflow="hidden"
            >
              {queryData &&
                queryData.features.map((feature) => {
                  return (
                    <Button
                      onClick={() =>
                        handleSearchClick(
                          feature.geometry.coordinates[1], // LAT
                          feature.geometry.coordinates[0] //LONG
                        )
                      }
                      key={feature.id}
                      d="flex"
                      py={4}
                      my={2}
                      justifyContent="flex-start"
                      width="100%"
                      _hover={{ backgroundColor: "purple.200" }}
                    >
                      <Text>{feature.place_name}</Text>
                    </Button>
                  );
                })}
            </Collapse>
          </Box>
        </FormControl>

        {/* FEATURED SECTION */}
        {/* SECTION WRAPPER */}
        <Flex flexDir="column" alignItems="center" mt={20}>
          {/* HEADING TEXT */}
          <Text as="h1" fontWeight="600" textAlign="center" fontSize="4xl">
            Featured
          </Text>
          {/* FEATURED CARD WRAPPER */}
          <Flex justifyContent="center" flexWrap={"wrap"} mt={10} width="100%">
            {/* LOOP OVER SINGLE CARD */}
            {featured.cities.map((city, i) => {
              return (
                <PseudoBox
                  key={i}
                  onClick={() =>
                    handleSearchClick(city.latitude, city.longitude)
                  }
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
                    {city.name}
                  </Text>
                  <Image
                    objectFit="cover"
                    width="100%"
                    height="auto"
                    src={city.image_url}
                  ></Image>
                </PseudoBox>
              );
            })}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

const featured = {
  cities: [
    {
      name: "New York",
      image_url:
        "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80 750w",
      latitude: 40.758896,
      longitude: -73.98513,
    },
    {
      name: "San Fransisco",
      image_url:
        "https://images.unsplash.com/photo-1521464302861-ce943915d1c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80 751w",
      latitude: 37.773972,
      longitude: -122.431297,
    },
    {
      name: "London",
      image_url:
        "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80 750w",
      latitude: 51.509865,
      longitude: -0.118092,
    },
    {
      name: "Sydney",
      image_url:
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80 750w",
      latitude: -33.865143,
      longitude: 151.2099,
    },
  ],
};

import dynamic from "next/dynamic";
import useStore from "../store";
import getRestaurants from "../hooks/getRestaurants";
import { Box } from "@chakra-ui/core";
import Navigation from "../components/Navigation";
import Head from "next/head";

const DynamicMap = dynamic(() => import("../components/ExploreMap"), {
  ssr: false,
});

const Explore = () => {
  const [viewport, setViewport] = React.useState({
    latitude: useStore((state) => state.latitude),
    longitude: useStore((state) => state.longitude),
    width: "100%",
    height: "90vh",
    zoom: 13,
  });
  const [focused, setFocused] = React.useState({ id: "" });

  const { data } = getRestaurants(viewport.latitude, viewport.longitude);

  return (
    <Box d="grid" gridTemplateColumns="minmax(450px, 2fr) 7fr">
      <Head>
        <title>NYC Eatery - Exlpore</title>
      </Head>
      <div>
        <Navigation data={data} focused={focused} setFocused={setFocused} />
      </div>
      <div>
        <DynamicMap
          data={data}
          viewport={viewport}
          setViewport={setViewport}
          focused={focused}
          setFocused={setFocused}
        />
      </div>
    </Box>
  );
};

export default Explore;

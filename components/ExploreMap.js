import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
} from "@urbica/react-map-gl";
import getConfig from "next/config";
import { IconButton } from "@chakra-ui/core";
import Pin from "./Pin";

const { publicRuntimeConfig } = getConfig();

export default function ExploreMap({
  data,
  viewport,
  setViewport,
  focused,
  setFocused,
}) {
  // THEME STARTS AS LIGHT
  const [mapTheme, setMapTheme] = React.useState(true);
  const lightMap = "mapbox://styles/mapbox/light-v9";
  const darkMap = "mapbox://styles/mapbox/dark-v9";

  return (
    <React.Fragment>
      <ReactMapGL
        {...viewport}
        style={{ width: "100%", height: "90vh" }}
        mapStyle={mapTheme ? lightMap : darkMap}
        accessToken={publicRuntimeConfig.MapboxAccessToken}
        onViewportChange={setViewport}
      >
        {/* DARK MODE/LIGHT MODE TOGGLE BUTTON */}
        <IconButton
          aria-label="Toggle map mode"
          icon={mapTheme ? "moon" : "sun"}
          size="lg"
          padding="20px 20px"
          borderRadius="30px"
          background={mapTheme ? "#68D391" : "#FAF089"}
          fontWeight="600"
          fontSize="1.8rem"
          position="absolute"
          right="80px"
          top="1rem"
          // TOGGLE
          onClick={() => {
            // MAKING ASYNC TO AVOID ERRORS
            setTimeout(() => {
              setMapTheme(!mapTheme);
            }, 100);
          }}
        />
        {/* REFRESH BUTTON */}
        <IconButton
          aria-label="Search restaurants"
          icon="repeat"
          size="lg"
          padding="20px 20px"
          borderRadius="30px"
          background={mapTheme ? "#68D391" : "#FAF089"}
          fontWeight="600"
          fontSize="1.8rem"
          position="absolute"
          right="50%"
          top="1rem"
          isLoading={!data}
          isDisabled={true}
        />
        <GeolocateControl style="top-right" />
        <NavigationControl showCompass showZoom position="top-right" />
        {/* MAP PIN AND BOX COMPONENT */}
        {data &&
          data.businesses.map((business) => {
            return (
              <Pin
                key={business.id}
                business={business}
                focused={focused}
                setFocused={setFocused}
              ></Pin>
            );
          })}
      </ReactMapGL>
    </React.Fragment>
  );
}

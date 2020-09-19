import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";

import getConfig from "next/config";
import Pin from "./pin";
const { publicRuntimeConfig } = getConfig();

const geolocateStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  margin: 10,
  padding: ".5rem",
};

const navStyle = {
  position: "absolute",
  top: 72,
  right: 0,
  padding: "10px",
  margin: 10,
};

class Map extends React.Component {
  state = {
    viewport: {
      width: "100%",
      height: "100vh",
      latitude: 40.7378921,
      longitude: -73.9393873,
      zoom: 13,
    },
    popUpInfo: null,
  };

  render() {
    return (
      <React.Fragment>
        <ReactMapGL
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/light-v9"
          mapboxApiAccessToken={publicRuntimeConfig.MapboxAccessToken}
          onViewportChange={(viewport) => this.setState({ viewport })}
        >
          <GeolocateControl style={geolocateStyle} />
          <div style={navStyle}>
            <NavigationControl showCompass={false} />
          </div>
          <Pin></Pin>
        </ReactMapGL>
      </React.Fragment>
    );
  }
}

export default Map;

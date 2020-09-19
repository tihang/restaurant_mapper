import * as React from "react";
import { PureComponent } from "react";
import { Marker, Popup } from "react-map-gl";

const pinStyle = {
  cursor: "pointer",
};

export default class Pin extends PureComponent {
  render() {
    const { size = 30 } = this.props;

    return (
      <>
        <Marker latitude={40.7378921} longitude={-73.9393873}>
          <img
            src="/images/pin.svg"
            alt="Pin"
            style={pinStyle}
            height={size}
            width={size}
            onMouseEnter={() => console.log("Mouse enter")}
            onMouseLeave={() => console.log("Mouse exit")}
          />
        </Marker>
        <Popup
          style={pinStyle}
          tipSize={10}
          latitude={40.7378921}
          longitude={-73.9393873}
          offsetLeft={10}
          offsetTop={10}
          closeOnClick={true}
        >
          Some text example
        </Popup>
      </>
    );
  }
}

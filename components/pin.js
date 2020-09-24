import ReactStars from "react-rating-stars-component";
import { Marker, Popup } from "@urbica/react-map-gl";
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Image, Text } from "@chakra-ui/core";

export default function Pin({ business, focused, setFocused }) {
  const sm = 30;
  const lg = 50;

  return (
    <React.Fragment>
      <Marker
        latitude={business.coordinates.latitude}
        longitude={business.coordinates.longitude}
      >
        <img
          src="/images/pin.svg"
          alt="Pin"
          style={{ cursor: "pointer" }}
          height={focused.id === business.id ? lg : sm}
          width={focused.id === business.id ? lg : sm}
          // Pass scroll true as state to scroll the navitem component
          onMouseEnter={() => setFocused({ id: business.id, scroll: true })}
        />
      </Marker>

      {focused.id === business.id ? (
        <Popup
          css={popupStyle}
          latitude={business.coordinates.latitude}
          longitude={business.coordinates.longitude}
          offset={20}
          closeButton={false}
        >
          {/* <Image
            src={business.image_url}
            objectFit="cover"
            size="200px"
            alt="image"
          /> */}
          <div className="mapboxgl-popup-desc">
            <div>{business.name}</div>
            <div>
              <ReactStars
                value={business.rating}
                count={5}
                edit={false}
                size={20}
              ></ReactStars>
            </div>
          </div>
        </Popup>
      ) : null}
    </React.Fragment>
  );
}
/* STYLE FOR PIN POPUP */
const popupStyle = css`
  cursor: pointer;

  /* STYLE FOR POUP  */
  .mapboxgl-popup-desc {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;
    margin: 0.5rem;
    text-align: center;
  }

  .mapboxgl-popup-close-button {
    margin: 10px;
    color: red;
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

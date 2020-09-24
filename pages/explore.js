import useSWR from "swr";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import { fetcher } from "../lib/fetcher";
import Navigation from "../components/Navigation";

const DynamicMap = dynamic(() => import("../components/ExploreMap"), {
  ssr: false,
});

const ExploreLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(450px, 2fr) 7fr;
`;

const Explore = () => {
  const [viewport, setViewport] = React.useState({
    latitude: 40.7337298,
    longitude: -73.9843936,
    width: "100%",
    height: "90vh",
    zoom: 13,
  });
  const [focused, setFocused] = React.useState({ id: "" });

  // QUERY STRING TO FETCH DATA
  const queryString = `/api/restaurants?latitude=${viewport.latitude}&longitude=${viewport.longitude}`;
  // USE SWR TO FETCH DATA FROM YELP API
  const { data, error } = useSWR(queryString, fetcher);

  return (
    <ExploreLayout>
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
    </ExploreLayout>
  );
};

export default Explore;

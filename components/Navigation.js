import NavItemCard from "./NavItemCard";
import Scrollbar from "react-scrollbars-custom";
import { Skeleton } from "@chakra-ui/core";

const Navigation = ({ data, focused, setFocused }) => {
  return (
    <Scrollbar>
      <Skeleton height="100vh" width="100%" isLoaded={data}>
        {data &&
          data.businesses.map((business, i) => {
            return (
              <NavItemCard
                index={i + 1}
                business={business}
                focused={focused}
                setFocused={setFocused}
                key={business.id}
              ></NavItemCard>
            );
          })}
      </Skeleton>
    </Scrollbar>
  );
};

export default Navigation;

import CabinetContainer from "../components/Hoc/CabinetContainer";
import Sessions from "../components/cabinet/sessions/sessions";
import Locations from "../components/cabinet/locations/locations";

const Cabinet = () => {
  return (
    <CabinetContainer keywords={"cabinet"} title={"Cabinet"}>
      <Sessions />
      <Locations />
    </CabinetContainer>
  );
};

export default Cabinet;

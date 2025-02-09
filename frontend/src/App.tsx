import HealerSection from "./components/HealerSection";
import AttackerSection from "./components/AttackerSection";
import DefenderSection from "./components/DefenderSection";
import styled from "styled-components";
import InfoSection from "./components/InfoSection";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-evenly;
  padding: 0;
  
`;

export default function App() {
  return (
    <AppContainer className="App">
      <InfoSection />
      <AttackerSection />
      <DefenderSection />
      <HealerSection />
    </AppContainer>
  );
}

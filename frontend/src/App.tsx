import HealerSection from "./components/HealerSection";
import AttackerSection from "./components/AttackerSection";
import DefenderSection from "./components/DefenderSection";
import styled from "styled-components";
import InfoSection from "./components/InfoSection";

const styleThreshold = 700;

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-evenly;
  padding: 0;
  width: 100%;

  @media(max-width: ${styleThreshold}px) {
    flex-direction: column;
  }
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

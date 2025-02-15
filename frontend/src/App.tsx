import HealerSection from "./components/HealerSection";
import AttackerSection from "./components/AttackerSection";
import DefenderSection from "./components/DefenderSection";
import styled from "styled-components";
import InfoSection from "./components/InfoSection";
// @ts-ignore
import PokeballBg from "./assets/pokeball.png";

const styleThreshold = 900;

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  padding: 0;
  width: 100%;
  background: url(${PokeballBg}) bottom -10vw left -10vw no-repeat;
  background-size: 30vw;

  @media(max-width: ${styleThreshold}px) {
    flex-direction: column;
    background-size: 40vh;
    background-position: bottom -10vh left -10vh;
    background-attachment: fixed;
  }
`;

const Spacer = styled.div`
  width: 2.5vw;
  background-color: rgba(36, 36, 36, 0.8);
  
  @media(max-width: ${styleThreshold}px) {
    display: none;
  }
`;

export default function App() {
  return (
    <AppContainer className="App">
      <InfoSection />
      <Spacer />
      <AttackerSection />
      <Spacer />
      <DefenderSection />
      <Spacer />
      <HealerSection />
    </AppContainer>
  );
}

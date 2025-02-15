import styled from "styled-components";
import {ReactNode, useContext} from "react";
import CustomModalContext from "./CustomModalContext";

const styleThreshold = 900;

const StyledModal = styled.div`
  position: fixed;
  z-index: 6;
  top: 0;
  left: 0;
  width: 80%;
  height: 96%;
  background: rgba(255, 255, 255, 0.3);
  overflow-y: scroll;
  padding: 2% 10%;
  
  section {
    padding: 10px 20px;
    background: #242424;
    border-radius: 10px;
  }

  @media(max-width: ${styleThreshold}px) {
    font-size: 0.8em;
    
    ul {
      padding-left: 10px;
    }
    
    ol {
      padding-left: 10px;
    }
  }
`;

export interface CustomModalProps {
  content: ReactNode | undefined
}

export default function CustomModal(props: CustomModalProps) {
  const {setContent} = useContext(CustomModalContext);
  if (!props.content) {
    return <></>;
  }
  return <StyledModal onClick={() =>{setContent()}}>
    <section onClick={() => {}}>
      {props.content}
    </section>
  </StyledModal>;
}
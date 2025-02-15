import {createContext, ReactNode, useState} from "react";
import CustomModal from "./CustomModal";

export interface CustomModalContextProps {
  children: ReactNode,
  content?: ReactNode
}

export interface CustomModalValues {
  currentContent?: ReactNode | undefined,
  setContent: (node?: ReactNode) => void
}

const CustomModalContext = createContext<CustomModalValues>({setContent: () => {}});
export default CustomModalContext;

export function CustomModalContextProvider(props: CustomModalContextProps) {
  const [content, setContent] = useState<ReactNode>();
  return <CustomModalContext.Provider value={{currentContent: content, setContent}}>
    <CustomModal content={content}/>
    {props.children}
  </CustomModalContext.Provider>;
}
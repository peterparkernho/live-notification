import { useContext } from "react";
import context from "../components/SocketProvider/context";

const useSocketProvider = () => {
  const contextValues = useContext(context);
  return contextValues;
}

export default useSocketProvider;
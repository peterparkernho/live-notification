import { useContext } from "react";
import { SocketContext } from "../components/SocketProvider/SocketProvider";

const useSocketProvider = () => {
  const context = useContext(SocketContext);
  return context;
}

export default useSocketProvider;
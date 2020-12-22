import React, { createContext, Dispatch, useEffect, useState } from "react";
import { BinTypes } from "../container/binMap/NewBinModal";
import { io } from 'socket.io-client';
const SOCKET_ENDPOINT = "http://4bdb0d05d756.ngrok.io:3000";

interface UserProviderProps {
  children: JSX.Element;
}
interface IUserContextTypes {
  binList: BinTypes[], setBinList: Dispatch<BinTypes[]>
}

const USER_CONTEXT_INITIAL_VALUES = {
  binList: [], setBinList: () => { }
};

export const UserContext = createContext<IUserContextTypes>({
  ...USER_CONTEXT_INITIAL_VALUES,
});

function UserProvider({ children }: UserProviderProps) {
  const [binList, setBinList] = useState<BinTypes[]>([]);
  // const [response, setResponse] = useState("");

  useEffect(() => {
    let socket = io(SOCKET_ENDPOINT);
    socket.emit("join", (error: any) => {
      console.log("join");
      if (error) {
        alert(error);
      }
    });
    socket.on("data", (message: any) => {
      console.log(message);
    });
  }, []);

  const providerValue = { binList, setBinList };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

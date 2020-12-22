import React, { createContext, Dispatch, useState } from "react";
import { BinTypes } from "../container/binMap/NewBinModal";

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

  const providerValue = { binList, setBinList };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

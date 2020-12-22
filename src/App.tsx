import React from "react";
import RootContainer from "./container/RootContainer";
import { hot } from 'react-hot-loader/root'

function App() {
  return (
    <RootContainer />
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App

import React from "react";
import { Route, Switch } from "react-router-dom";
import container from "../container";

function GuestNavigation() {
  return (
    <Switch>
      <Route exact path="/" component={container.BinMap} />
      <Route exact path="/bin-list" component={container.BinList} />
    </Switch>
  );
}

export default GuestNavigation;

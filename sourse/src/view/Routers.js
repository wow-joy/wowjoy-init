import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import List from "./List";
import Home from "./Home";

class Routers extends Component {
  routerList = [
    {
      props: {
        exact: true,
        path: "/list"
      },
      title: "列表",
      component: List
    },
    {
      props: {
        exact: true,
        path: "/home"
      },
      title: "首页",
      component: Home
    }
  ];
  render() {
    return (
      <Switch>
        {this.routerList.map((ele, index) => (
          <Route
            key={index}
            {...ele.props}
            render={props => {
              const { component: Component, title } = ele;
              title && (document.title = title);
              return <Component {...props} />;
            }}
          />
        ))}

        <Redirect to={"/home"} />
      </Switch>
    );
  }
}

export default Routers;

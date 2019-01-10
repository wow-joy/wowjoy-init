import React, { Component } from "react";
import Routers from "./Routers";
import { ThemeProvider } from "styled-components";
import { Layout, Nav, Header } from "wowjoy-ui";
import { ReactComponent as Home } from "wowjoy-ui/es/static/medias/svg/home.svg";
const theme = {
  mainColor: "#06AEA6" // 主题色设置
};
const navList = [
  {
    content: [<Home key={"icon"} />, "首页"],
    id: "home",
    to: "/home"
  },
  {
    content: [<Home key={"icon"} />, "列表"],
    id: "list",
    to: "/list"
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: true
    };
  }
  toggleNav = () => {
    this.setState({
      showNav: !this.state.showNav
    });
  };
  render() {
    const { showNav } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Layout
          className="App"
          header={<Header onChange={this.toggleNav} />}
          asideLeft={<Nav navList={navList} />}
          showLeft={showNav}
        >
          <Routers />
        </Layout>
      </ThemeProvider>
    );
  }
}

export default App;

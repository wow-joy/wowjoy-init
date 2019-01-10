import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import style from "./index.module.css";
class Home extends PureComponent {
  render() {
    return (
      <div className={style.wrap}>
        Hello Home!
        <br />
        使用 css 模块, 需要将文件命名为 xxx.module.css!; 使用 sass
        <br />
        less 还需要安装对应loader;
      </div>
    );
  }
}

Home.propTypes = {};

export default Home;

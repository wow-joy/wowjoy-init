import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { $fetch, apis } from "config/request";
const Wrap = styled.div`
  font-size: 18px;
`;
class index extends PureComponent {
  componentDidMount() {
    // 这是一个fetch的demo
    $fetch
      .post(apis, {
        body: JSON.stringify({ xxx: 111 })
      })
      .then(res => console.log(res, "success"))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Wrap>
        Hello List
        <br />
        这是一个styled-components的demo
      </Wrap>
    );
  }
}

index.propTypes = {};

export default index;

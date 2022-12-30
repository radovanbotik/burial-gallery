import React from "react";
import styled from "styled-components";
import { BurialLogo } from "../assets/logos/BurialLogo";
import { BurialText } from "../assets/logos/BurialText";

import { Button } from "./Button";

export const Navbar = () => {
  return (
    <Wrapper>
      {/* <Button text={"burial"} /> */}
      <div className="logo">
        <div className="logo-graphic">
          <BurialLogo />
        </div>
        <h2>burial</h2>
      </div>
      <div className="player"></div>
      {/* <BurialText /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 60px;
  padding: 10px 20px 0;
  display: flex;
  .logo {
    display: flex;
    flex-wrap: nowrap;
    gap: 1ex;
    align-items: center;
    .logo-graphic {
      height: 30px;
      width: 30px;
    }
    h2 {
      word-break: keep-all;
    }
  }
  .player {
    height: 100%;
    width: 100%;
    /* background-color: gold; */
  }
  /* background-color: black; */
`;

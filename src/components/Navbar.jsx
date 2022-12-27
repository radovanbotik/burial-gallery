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
        <BurialLogo />
      </div>
      <h2>burial</h2>
      {/* <BurialText /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 60px;
  padding: 10px 20px 0;
  display: flex;
  gap: 1ex;
  align-items: center;
  .logo {
    height: 30px;
    width: 30px;
  }
  /* background-color: black; */
`;

import React, { useEffect, useLayoutEffect } from "react";
import { Button } from "../../components";
import { GridGallery } from "./GridGallery";
import styled from "styled-components";
import LocomotiveScroll from "locomotive-scroll";
import hyperdublogo from "../../assets/logos/hyperdub-logo.jpg";
import untruefront from "../../assets/images/untruefront.webp";

export const LandingPage = () => {
  useLayoutEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      direction: "horizontal",
      smooth: true,
    });
  }, []);

  return (
    <Page data-scroll-container>
      <div className="control">
        <div className="leftbox" data-scroll-section>
          {/* <Button text="view more" /> */}
          <div
            className="image-control"
            data-scroll
            data-scroll-speed="-4"
            data-scroll-position="left"
          ></div>
        </div>
        <div className="rightbox" data-scroll-section>
          <GridGallery />
        </div>
      </div>
      {/* <Button text={"view more"} /> */}
    </Page>
  );
};

const Page = styled.section`
  height: calc(100vh - 60px);
  padding: 20px;
  .control {
    height: inherit;
    height: 100%;
    display: flex;
    position: relative;
    .leftbox {
      flex: none;
      width: 50vw;
      height: inherit;
      height: 100%;
      position: relative;
      display: grid;
      align-items: flex-start;
      justify-content: flex-start;
      /* float: left; */

      .image-control {
        position: absolute;
        height: inherit;
        height: 100%;
        width: 100%;
        background-image: url(${untruefront});
        /* background-size: cover; */
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        /* background-attachment: fixed; */
      }
    }
    .rightbox {
      /* flex-shrink: 0; */
      flex: none;

      width: 100vw;
      /* height: 100%; */
      /* background-color: yellow; */
    }
  }
`;

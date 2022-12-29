import React, { useEffect, useLayoutEffect } from "react";
import { Button } from "../../components";
import { GridGallery } from "./GridGallery";
import styled from "styled-components";
import LocomotiveScroll from "locomotive-scroll";
import hyperdublogo from "../../assets/logos/hyperdub-logo.jpg";
import untruefront from "../../assets/images/untruefront.webp";
import { useSpotifyContext } from "../../context/SpotifyContext";

export const LandingPage = () => {
  const { coverArt } = useSpotifyContext();
  useLayoutEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      direction: "horizontal",
      smooth: true,
    });
  }, []);

  const styles = {
    backgroundImage: coverArt ? `url(${coverArt})` : `url(${untruefront})`,
  };
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
            style={styles}
          >
            {/* <h1>Burial untrue</h1> */}
          </div>
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
        background-position: center;
        background-size: cover;
        background-size: contain;
        background-repeat: no-repeat;
        display: grid;
        justify-content: center;
        h1 {
          color: #7bff00;
          /* mix-blend-mode: multiply; */
          /* mix-blend-mode: screen; */
          /* mix-blend-mode: overlay; */
          /* mix-blend-mode: darken; */
          /* mix-blend-mode: lighten; */
          /* mix-blend-mode: color-dodge; */
          /* mix-blend-mode: color-burn; */
          /* mix-blend-mode: hard-light; */
          /* mix-blend-mode: soft-light; */
          /* mix-blend-mode: difference; */
          /* mix-blend-mode: exclusion; */
          /* mix-blend-mode: hue; */
          /* mix-blend-mode: saturation; */
          /* mix-blend-mode: color; */
          mix-blend-mode: luminosity;
          z-index: 2;
        }
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

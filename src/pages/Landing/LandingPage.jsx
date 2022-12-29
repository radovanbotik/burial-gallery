import React, { useEffect, useLayoutEffect } from "react";
import { Button } from "../../components";
import { GridGallery } from "./GridGallery";
import styled from "styled-components";
import LocomotiveScroll from "locomotive-scroll";
import hyperdublogo from "../../assets/logos/hyperdub-logo.jpg";
import untruefront from "../../assets/images/untruefront.webp";
import { useSpotifyContext } from "../../context/SpotifyContext";

export const LandingPage = () => {
  const { clicked } = useSpotifyContext();
  const { name, release_date, total_tracks, type, artists, images, tracks } =
    clicked;
  const coverArt = images ? images[0].url : untruefront;
  console.log(tracks);

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
            className="card"
            data-scroll
            data-scroll-speed="-4"
            data-scroll-position="left"
          >
            <div className="image-control" style={styles}>
              <img src={coverArt} alt="" />
            </div>

            {tracks && (
              <div className="tracks">
                <h2>{name}</h2>
                <h1>tracklist:</h1>
                <ul className="tracklist">
                  {tracks.map(track => {
                    return (
                      <li key={track.id}>
                        <h6>{track.name}</h6>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
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
      /* display: grid;
      align-items: flex-start;
      justify-content: flex-start; */
      /* float: left; */
      .card {
        display: grid;
        /* grid-template-columns: minmax(100px, 400px) max-content; */
        gap: var(--vspace-2);
        /* grid-template-rows: minmax(100px, 400px) auto; */
        .image-control {
          max-height: 400px;
          /* max-width: 300px; */
          /* aspect-ratio: 16/9; */
          img {
            object-fit: cover;
            object-position: center;
          }
        }
        .tracks {
          .tracklist {
            display: flex;
            gap: 1ex;
          }
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

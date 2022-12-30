import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button } from "../../components";
import { GridGallery } from "./GridGallery";
import styled from "styled-components";
import LocomotiveScroll from "locomotive-scroll";
import burialtyped from "../../assets/images/burial-typed.svg";
import untruefront from "../../assets/images/untruefront.webp";
import { useSpotifyContext } from "../../context/SpotifyContext";

export const LandingPage = () => {
  const { clicked, audioSrc } = useSpotifyContext();
  const { name, release_date, total_tracks, type, artists, images, tracks } =
    clicked;
  const coverArt = images ? images[0].url : untruefront;
  const [currentTrack, setCurrentTrack] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const setTrack = async e => {
    setCurrentTrack(new Audio(e.currentTarget.dataset.src));
  };

  console.log(currentTrack);
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
            className="card"
            data-scroll
            data-scroll-speed="-4"
            data-scroll-position="left"
          >
            <div className="image-control">
              <img src={coverArt} alt="" />
            </div>

            {tracks && (
              <>
                <div className="tracks">
                  <h2>{name}</h2>
                  <h1>tracklist:</h1>
                  <ul className="tracklist">
                    {tracks.map(track => {
                      return (
                        <li key={track.id}>
                          <h6>{track.name} |</h6>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="player">
                  {audioSrc.map(track => {
                    return (
                      <div
                        className="audio-example"
                        key={track.id}
                        data-src={track.source}
                        // onClick={setTrack}
                        onClick={
                          // e =>
                          // setCurrentTrack(
                          //   new Audio(e.currentTarget.dataset.src)
                          // )
                          setTrack
                        }
                      >
                        <span className="material-symbols-outlined icon">
                          play_arrow
                        </span>
                        <h6>{track.name}</h6>
                        {/* <Button text={"play"} /> */}
                      </div>
                    );
                  })}
                  {/* <span className="material-symbols-outlined icon">
                    play_arrow
                  </span> */}
                </div>
              </>
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
    gap: var(--vspace-1);
    .leftbox {
      flex: none;
      width: 50vw;
      height: inherit;
      height: 100%;
      position: relative;
      padding: var(--vspace-1);
      /* display: grid;
      align-items: flex-start;
      justify-content: flex-start; */
      /* float: left; */
      .card {
        height: 100%;
        display: grid;
        /* grid-template-columns: minmax(100px, 400px) max-content; */
        grid-template-rows: minmax(200px, 300px) min-content max-content;
        gap: var(--vspace-2);
        /* grid-template-rows: minmax(100px, 400px) auto; */
        .image-control {
          /* max-height: 300px; */
          /* max-width: 300px; */
          /* aspect-ratio: 16/9; */
          img {
            object-fit: cover;
            object-position: center;
            object-fit: contain;
            object-position: left;
          }
        }
        .tracks {
          h2 {
            margin-bottom: 16px;
          }
          h1 {
            margin-bottom: 16px;
          }
          .tracklist {
            display: flex;
            gap: 1ex;
            /* list-style: unset; */
            /* list-style: circle; */
            /* list-style-position: inside; */
            li {
              /* display: inline-block; */
              /* border-right: 1px solid black;
              padding-right: 1ex; */
            }
            /* li::marker {
              content: url("../../assets/logos/hyperdub-logo.jpg");
              font-size: large;
            } */
          }
        }
        .player {
          background-color: black;
          width: 100%;
          color: var(--white-main);
          /* display: grid; */
          /* grid-template-columns: min-content min-content; */
          /* justify-content: space-between; */
          gap: var(--vspace-3);
          padding: var(--vspace-3);
          .audio-example {
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          .icon {
            /* font-size: var(--size-700); */
            font-size: inherit;
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

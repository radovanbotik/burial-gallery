import React from "react";
import styled from "styled-components";
import { useSpotifyContext } from "../../context/SpotifyContext";

export const GridGallery = () => {
  const { albums, handleSelection } = useSpotifyContext();
  return (
    <Wrapper>
      {albums &&
        albums.items.map((item, index) => {
          return (
            <div
              className="card"
              key={item.id}
              style={{ backgroundImage: `url(${item.images[0].url})` }}
              onClick={e => handleSelection(item)}
            >
              <div className="overlay">
                <h2>{item.name}</h2>
                <h2>{item.release_date}</h2>
              </div>
            </div>
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  background-color: white;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--vspace-3);
  padding: var(--vspace-1);

  .card {
    position: relative;
    grid-column: span 2;
    /* background-size: contain; */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    transition: all 500ms ease-in-out;
    background-position-x: 10px;
    cursor: pointer;

    &:hover {
      /* background-position: 0px 5px; */
      background-position-x: 0px;
      .overlay {
        /* display: grid; */
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
      }
    }
    .overlay {
      /* display: none; */
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: #00000091;
      color: var(--white-main);
      display: grid;
      place-content: center;
      /* gap: var(--vspace-3); */
      clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
      transition: clip-path 500ms ease-in-out;
    }
  }
`;

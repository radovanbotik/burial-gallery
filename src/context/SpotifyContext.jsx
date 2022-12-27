import React from "react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const client_id = import.meta.env.VITE_CLIENT_ID;
const client_secret = import.meta.env.VITE_CLIENT_SECRET;
const dataContext = React.createContext();

const SpotifyContext = ({ children }) => {
  const [token, setToken] = useState();
  const [albums, setAlbums] = useState();
  useEffect(() => {
    const getToken = async () => {
      const resp = await axios("https://accounts.spotify.com/api/token", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(client_id + ":" + client_secret),
        },
        data: "grant_type=client_credentials",
        method: "POST",
      });
      setToken(resp.data.access_token);
      return resp.data.access_token;
    };
    const getArtist = async () => {
      const tokendata = await getToken();
      const options = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + tokendata,
        },
      };
      const resp = await fetch(
        "https://api.spotify.com/v1/artists/0uCCBpmg6MrPb1KY2msceF/albums?include_groups=single&market=SK",
        options
      );
      const data = await resp.json();
      setAlbums(data);
    };
    getArtist();
  }, []);

  // useEffect(() => {
  //   const getArtist = async () => {
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     };
  //     const resp = await fetch(
  //       "https://api.spotify.com/v1/artists/0uCCBpmg6MrPb1KY2msceF/albums?include_groups=single&market=SK",
  //       options
  //     );
  //     const data = await resp.json();
  //     setAlbums(data);
  //   };
  //   getArtist();
  // }, [token]);
  //   useEffect(() => {
  //     const client_id = import.meta.env.VITE_CLIENT_ID;
  //     const client_secret = import.meta.env.VITE_CLIENT_SECRET;
  //     (() => {
  //       fetch("https://accounts.spotify.com/api/token", {
  //         method: "POST",
  //         headers: {
  //           Authorization: "Basic " + btoa(client_id + ":" + client_secret),
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //         data: "grant_type=client_credentials",
  //       })
  //         .then(resp => resp.json())
  //         .then(data => {
  //           setToken(data);
  //           return data;
  //         })
  //         .then(
  //           data =>
  //             fetch(
  //               "https://api.spotify.com/v1/artists/0uCCBpmg6MrPb1KY2msceF/albums?include_groups=single&market=SK"
  //             ),
  //           {
  //             method: "GET",
  //             headers: {
  //               Authorization: "Bearer " + token,
  //             },
  //           }
  //         )
  //         .then(resp => resp.json())
  //         .then(data => setAlbums(data));
  //     })();
  //   }, []);
  return (
    <dataContext.Provider value={{ albums }}>{children}</dataContext.Provider>
  );
};

const useSpotifyContext = () => {
  return useContext(dataContext);
};

export { SpotifyContext, useSpotifyContext };

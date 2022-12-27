import React from "react";
import { useContext, useState, useEffect } from "react";

const dataContext = React.createContext();

const SpotifyContext = ({ children }) => {
  const [token, setToken] = useState();
  const [albums, setAlbums] = useState();
  useEffect(() => {
    const getToken = async () => {
      const client_id = import.meta.env.VITE_CLIENT_ID;
      const client_secret = import.meta.env.VITE_CLIENT_SECRET;
      const options = {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(client_id + ":" + client_secret),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      };
      const resp = await fetch(
        "https://accounts.spotify.com/api/token",
        options
      );
      const tokendata = await resp.json();
      setToken(tokendata.access_token);
      const getArtist = async () => {
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
    };
    getToken();
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
  return (
    <dataContext.Provider value={{ albums }}>{children}</dataContext.Provider>
  );
};

const useSpotifyContext = () => {
  return useContext(dataContext);
};

export { SpotifyContext, useSpotifyContext };

import React from "react";
import { useContext, useState, useEffect } from "react";

const dataContext = React.createContext();

const SpotifyContext = ({ children }) => {
  const [token, setToken] = useState();
  const [albums, setAlbums] = useState();
  // useEffect(() => {
  //   const getToken = async () => {
  //     const client_id = import.meta.env.VITE_CLIENT_ID;
  //     const client_secret = import.meta.env.VITE_CLIENT_SECRET;
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         Authorization: "Basic " + btoa(client_id + ":" + client_secret),
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: "grant_type=client_credentials",
  //     };
  //     const resp = await fetch(
  //       "https://accounts.spotify.com/api/token",
  //       options
  //     );
  //     const data = await resp.json();
  //     setToken(data.access_token);
  //   };
  //   getToken();
  // }, []);

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

  useEffect(() => {
    const client_id = import.meta.env.VITE_CLIENT_ID;
    const client_secret = import.meta.env.VITE_CLIENT_SECRET;
    (() => {
      fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(client_id + ":" + client_secret),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      })
        .then(resp => resp.json())
        .then(data => {
          setToken(data);
          return data;
        })
        .then(
          data =>
            fetch(
              "https://api.spotify.com/v1/artists/0uCCBpmg6MrPb1KY2msceF/albums?include_groups=single&market=SK"
            ),
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then(resp => resp.json())
        .then(data => setAlbums(data));
    })();
  }, []);
  return (
    <dataContext.Provider value={{ albums }}>{children}</dataContext.Provider>
  );
};

const useSpotifyContext = () => {
  return useContext(dataContext);
};

export { SpotifyContext, useSpotifyContext };

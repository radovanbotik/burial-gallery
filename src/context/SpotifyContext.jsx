import React from "react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const client_id = import.meta.env.VITE_CLIENT_ID;
const client_secret = import.meta.env.VITE_CLIENT_SECRET;
const dataContext = React.createContext();

const SpotifyContext = ({ children }) => {
  const [token, setToken] = useState("");
  const [albums, setAlbums] = useState("");
  const [albumData, setAlbumData] = useState("");
  const [clicked, setClicked] = useState({});

  const getAlbum = async href => {
    const resp = await axios(`${href}/tracks`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
    });
    // let previewURL = new Audio(resp.data.items[0].preview_url);
    // previewURL.play();
    // previewURL.pause();
    const data = resp.data.items.map(item => {
      return { name: item.name, audio: item.preview_url };
    });

    setAlbumData(resp.data.items);
    return resp.data.items;
  };

  const handleSelection = item => {
    getAlbum(item.href).then(tracks => setClicked({ ...item, tracks: tracks }));
  };

  //Get Token Fetch Artist
  useEffect(() => {
    //Get Token
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

    //Get Artist, Requires Token
    const getArtist = async () => {
      const tokendata = await getToken();

      const resp = await axios(
        "https://api.spotify.com/v1/artists/0uCCBpmg6MrPb1KY2msceF/albums?include_groups=album,single&market=SK&limit=50",
        {
          headers: {
            Authorization: "Bearer " + tokendata,
          },
          method: "GET",
        }
      );
      // console.log(resp.data);
      setAlbums(resp.data);
    };
    getArtist();
  }, []);

  return (
    <dataContext.Provider value={{ albums, handleSelection, clicked }}>
      {children}
    </dataContext.Provider>
  );
};

const useSpotifyContext = () => {
  return useContext(dataContext);
};

export { SpotifyContext, useSpotifyContext };

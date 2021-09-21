const axios = require('axios');
require('dotenv/config');
const writePlaylistData = require('./writeDataMongo');

const artistEndPoint = 'https://api.spotify.com/v1/artists/';
const albumEndPoint = 'https://api.spotify.com/v1/albums/';
let playlistEndPoint = 'https://api.spotify.com/v1/playlists/';
const { TOKEN, PLAYLIST_ID } = process.env;
const playlistPath = `${PLAYLIST_ID}/tracks`;
const axiosOptions = { headers: { authorization: `Bearer ${TOKEN}` } };

const userArr = new Set();
let pageArray = [];
let playlistData = [];

const getPlaylistData = async () => {
  playlistEndPoint += playlistPath;
  const playlistRequest = await axios.get(playlistEndPoint, axiosOptions);
  const { data } = await axios.get(playlistEndPoint, axiosOptions);
  const pages = Math.ceil(data.total / 100);

  for (const t of Array(pages)) {
    const tracks = playlistRequest.data.items;
    for (const track of tracks) {
      const {
        added_by: { href, id: userId },
        track: {
          artists: [{ name: artist_name, id: artist_id }],
          album: { name: album_name, id: album_id },
          name,
          id,
          duration_ms,
        },
      } = track;
      try {
        const artistData = await axios.get(artistEndPoint + artist_id, axiosOptions);
        const albumData = await axios.get(albumEndPoint + album_id, axiosOptions);
        const user = await axios.get(href, axiosOptions);
        userArr.add(user.data);

        console.log(t, 'Track: ', name);
        console.log('Artist: ', artistData.data.name);
        console.log('Album:', albumData.data.name);
        console.log('Inserido por:', user.data.display_name);
        console.log(albumData.data.release_date);
        console.log('\r\n');
        const trackInfo = {
          track: {
            id, 
            name,
            duration: duration_ms / 1000,
            album_id,
            user_id: userId,
          },
          user: { id: userId, display_name: user.data.display_name },
          artist: { id: artist_id, name: artist_name },
          album: {
            id: album_id,
            name: album_name,
            artist_id,
            genres: artistData.data.genres || 'diversos',
            release_date: new Date(albumData.data.release_date),
          },
        };
        pageArray.push(trackInfo);
      } catch (error) {
        console.log('erro', error);
        console.log('erro', error.response);
      }
    }
    playlistData = playlistData.concat(pageArray);
    pageArray = [];
    playlistEndPoint = playlistRequest.data.next;
  }
  return { playlistData, userArr };
};
getPlaylistData().then(() => {
  writePlaylistData(playlistData, userArr);
});

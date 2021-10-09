const axios = require('axios');
const removeDuplicates = require('./removeDuplicates');
require('dotenv/config');

const { TOKEN, PLAYLIST_ID } = process.env;

const artistEndPoint = 'https://api.spotify.com/v1/artists/';
const albumEndPoint = 'https://api.spotify.com/v1/albums/';
let playlistEndPoint = `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`;
const axiosOptions = { headers: { authorization: `Bearer ${TOKEN}` } };

const userArr = [];
let pageArray = [];
let playlistData = [];
let trackCounter = 0;

async function getMusicInfo(
  {
    added_by: { href, id: userId },
    track: {
      artists: [{ name: artist_name, id: artist_id }],
      album: { name: album_name, id: album_id },
      name,
      id,
      duration_ms,
    }, 
  },
) {
  const [artistData, albumData, user] = await Promise.all([
    axios.get(artistEndPoint + artist_id, axiosOptions),
    axios.get(albumEndPoint + album_id, axiosOptions),
    axios.get(href, axiosOptions),
  ]);

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
      genres: artistData.data.genres || ['diversos'],
      release_date: new Date(albumData.data.release_date),
    },
  };
  pageArray.push(trackInfo);
  userArr.push(user.data);
  
  console.log(trackCounter, 'Track: ', name);
  console.log('Artist: ', artistData.data.name);
  console.log('Album:', albumData.data.name);
  console.log('Inserido por:', user.data.display_name);
  console.log(albumData.data.release_date);
  console.log('\r\n');
  trackCounter += 1;
}

module.exports = async () => {
  try {
    const playlistRequest = await axios.get(playlistEndPoint, axiosOptions);
    const { data } = await axios.get(playlistEndPoint, axiosOptions);
    const pages = Math.ceil(data.total / 100);

    // eslint-disable-next-line no-unused-vars
    for (const _ of Array(pages)) {
      const tracks = playlistRequest.data.items;
      for (const track of tracks) {
        await getMusicInfo(track);
      }
      playlistData = playlistData.concat(pageArray);
      pageArray = [];
      playlistEndPoint = playlistRequest.data.next;
    }

    return { playlistData, userArr: removeDuplicates(userArr, 'uri') };
  } catch (error) {
    console.log('erro', error);
  }
};

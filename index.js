const axios = require('axios')
const writeUsers = require('./writeUsers')
const artistEndPoint = 'https://api.spotify.com/v1/artists/'
const albumEndPoint = 'https://api.spotify.com/v1/albums/'
let playlistEndPoint = 'https://api.spotify.com/v1/playlists/'
const playlistId = '4tvzbMapPt4t4FUTH4XiDl/tracks'
const token = 'BQDcFjFclz07X2Hmr1l-Q00zH-W1cWPX6dn422CtXqDTN0j8AAkYzUn8_mmBi4AvliAgy0kE_7hWK0VljMCb3A0IGRaiXnlxIJx2GeckwUOVMC0sG6YxwQ03rYAUjzNeKWg1nLz5f6tILjemVP1XUHzZ--cxWTA'
const options = { headers: { authorization: 'Bearer ' + token } }

const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t));

let userArr = new Set();
let pageArray = [];
let playlistData = [];

const getPlaylistData = async () => {
  playlistEndPoint = playlistEndPoint + playlistId;
  const { data } = await  axios.get(playlistEndPoint, options);
  const pages = Math.ceil(data.total / 100);

  for (let j = 0; j < pages; j += 1) {
    let playlistRequest = await axios.get(playlistEndPoint, options);
    let items = playlistRequest.data.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const {
        added_by: { href, id: userId },
        track: {
          artists: [{ name: artist_name, id: artist_id }],
          album: { name: album_name, id: album_id },
          name,
          id,
          duration_ms,
        }
      } = item;
      try {
        const artistData = await axios.get(artistEndPoint + artist_id, options);
        const albumData = await axios.get(albumEndPoint + album_id, options);
        const user = await axios.get(href, options);
        userArr.add(user.data);

        console.log(i, 'Track: ', name);
        console.log('Artist: ', artistData.data.name);
        console.log('Album:', albumData.data.name)
        console.log('Inserido por:', user.data.display_name);
        console.log('\r\n')
        await sleep(0)
        pageArray.push({
          song_id: id,
          name,
          userId,
          duration: duration_ms / 1000,
          artist: {
            artist_id,
            artist_name,
          },
          album: {
            album_id,
            album_name,
            artist_id,
            genre: artistData.data.genres || 'diversos',
            release_date: new Date(albumData.data.release_date),
            label_record: albumData.data.label,
          },
        })
      } catch (error) {
        console.log('erro', error);
        console.log('erro', error.response);
      }
    }
    playlistData = playlistData.concat(pageArray);
    pageArray = [];
    playlistEndPoint = playlistRequest.data.next;
    await sleep(0);
  }

}
const writePlaylistData = async () => {
  await getPlaylistData()
  require('fs').writeFile('./playlist.json', JSON.stringify(playlistData), console.log)
  require('fs').writeFile('./users.json', writeUsers([...userArr]), console.log)
}
writePlaylistData();

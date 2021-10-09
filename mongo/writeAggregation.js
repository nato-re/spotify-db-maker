const fs = require('fs');
const getPlaylistData = require('../getPlaylistData');
require('dotenv/config');

const { TURMA } = process.env;

const playlistJSONName = `playlist-T${TURMA}`;
const playlistJSONUsers = `users-T${TURMA}`;
const serialize = (data) => data.map(
    ({ track: { album_id: _, ...restTrack }, user: n_, ...rest }) =>
({ ...restTrack, ...rest }),
);

(async () => {
    try {
        const { playlistData, userArr } = await getPlaylistData();
        const tracksData = serialize(playlistData);
        fs.writeFileSync(`./data/${playlistJSONName}.json`, JSON.stringify(tracksData));
        fs.writeFileSync(`./data/${playlistJSONUsers}.json`,
            JSON.stringify(userArr));
    } catch (error) {
        console.log(error);
    }
})();

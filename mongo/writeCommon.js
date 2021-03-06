const fs = require('fs');
const getPlaylistData = require('../getPlaylistData');
require('dotenv/config');

const { TURMA } = process.env;

const playlistJSONName = `playlist-T${TURMA}`;
const playlistJSONUsers = `users-T${TURMA}`;

(async () => {
    const { playlistData, userArr } = await getPlaylistData();
    fs.writeFileSync(`./data/${playlistJSONName}.json`, JSON.stringify(playlistData), console.log);
    fs.writeFileSync(`./data/${playlistJSONUsers}.json`,
        JSON.stringify(userArr));
})();

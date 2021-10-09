const fs = require('fs');
const getPlaylistData = require('./getPlaylistData');
const removeDuplicates = require('./removeDuplicates');
require('dotenv/config');

const { TURMA } = process.env;

const playlistJSONName = `playlist-${TURMA}`;
const playlistJSONUsers = `users-${TURMA}`;

(async () => {
    const { playlistData, userArr } = await getPlaylistData();
    fs.writeFileSync(`./data/${playlistJSONName}.json`, JSON.stringify(playlistData), console.log);
    fs.writeFileSync(`./data/${playlistJSONUsers}.json`,
        JSON.stringify(removeDuplicates([...userArr], 'display_name')), console.log);
})();

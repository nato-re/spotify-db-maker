const fs = require('fs');
const removeDuplicates = require('./removeDuplicates');
require('dotenv/config');

const { TURMA } = process.env;

const playlistJSONName = `playlist-${TURMA}`;
const playlistJSONUsers = `users-${TURMA}`;

module.exports = async (playlistData, userArr) => {
    fs.writeFile(`./data/${playlistJSONName}.json`, JSON.stringify(playlistData), console.log);
    fs.writeFile(`./data/${playlistJSONUsers}.json`, 
    JSON.stringify(removeDuplicates([...userArr], 'display_name')), console.log);
};

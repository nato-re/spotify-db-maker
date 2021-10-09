const fs = require('fs');
const getPlaylistData = require('../getPlaylistData');
require('dotenv/config');

const { TURMA } = process.env;
const DB = 'Music';
const TABLE = 'tracks';
const BASE_QUERY = `DROP SCHEMA IF EXISTS ${DB};
CREATE SCHEMA IF NOT EXISTS ${DB};
USE ${DB};

CREATE TABLE ${TABLE} (
   id   INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
   name VARCHAR(28) NOT NULL,
   artist VARCHAR(74),
   album VARCHAR(100),
   duration DOUBLE NOT NULL,
   release_date DATETIME
);
`;
function main(list) {
    const insertTrackQuery = ({ table, name, artist, album, duration, date }) =>
     `INSERT  INTO ${table
    }(name, artist, album, duration, release_date) VALUES ("${name}", "${artist
        }", "${album}", ${duration}, "${date}");`;
    const queries = list.map(({
                name,
                duration,
                artist: { artist_name: artist },
                album: { album_name: album, release_date: date } }) => insertTrackQuery(
                { TABLE, name, artist, album, duration, date: date.split('T')[0] },
));
    const insertQuery = queries.join('\r\n');

    const final = BASE_QUERY + insertQuery;

    fs.writeFileSync(`./data/non-normalized-playlist-${TURMA}.sql`, final);
}

getPlaylistData.then(main);

const fs = require('fs');
require('dotenv/config');

const { TURMA } = process.env;

const sqlString = require('sqlstring');
const getPlaylistData = require('../getPlaylistData');

const tableConstraintsObj = require('./tableConstraints');

const createDB = (name) => 
`DROP SCHEMA IF EXISTS ${name};\r\nCREATE SCHEMA IF NOT EXISTS ${name};\r\nUSE ${name};\r\n`;

const createTable = (tableName, constraints) => {
    const entries = Object.entries(constraints);
    const tableConstraints = entries.reduce((prev, [columnName, constraint], index) =>
        prev.concat(
            columnName !== 'fk'
                ? `${columnName} ${constraint}${index !== entries.length - 1 ? ',\r\n' : ''}`
                : constraint.join(',\r\n') + (index !== entries.length - 1 ? ',' : ''),
        ), '');
    const query = `CREATE TABLE ${tableName} (\r\n${tableConstraints}\r\n);\r\n`;
    return query;
};

const genericInsert = (table, columns, values) => {
    const vals = values.filter((v) => !Array.isArray(v)).reduce((prev, cur) => prev.concat(
        Number.isNaN(Number(cur))
            ? `${sqlString.escape(
                cur.includes('T00:00:00.000Z')
                    ? cur.split('T')[0] : cur,
            )}`
            : cur,
    ), []);

    return `INSERT IGNORE INTO ${table}(${columns.filter((v) => v !== 'fk')
        }) VALUES (${vals});\r\n`;
};

const createTables = (_tables) => {
    const {
        genres,
        user,
        artist,
        album,
        track,
        albumGenre,
    } = tableConstraintsObj;
    return createTable('genres', genres)
        + createTable('user', user)
        + createTable('artist', artist)
        + createTable('album', album)
        + createTable('albumGenre', albumGenre)
        + createTable('track', track);
};

const genresAlbuns = (genres, albuns) => {
    const array = [];
    albuns.forEach(
        (album) => album.genres.forEach(
            (genre) => {
                array.push([genres.indexOf(genre) + 1, album.id]);
            },
        ),
    );
    return array;
};

const uniqueObjectByKey = (data, key) => {
    const existMap = {};
    return data.reduce(
        (acc, cur) => {
            if (existMap[cur[key].id]) return acc;
            existMap[cur[key].id] = true;
            return acc.concat(cur[key]);
        }, [],
    );
};

const uniqueGenres = (data) => [...data.reduce(
    (prev, { genres }) => new Set([...prev, ...genres]), new Set(),
)];

const userInsert = (data) => data.reduce((prev, { id, display_name: name }) =>
    prev.concat(`INSERT IGNORE INTO user(id, display_name) VALUES ('${id}', '${name}');\r\n`), '');

const genresInsert = (data) => data.reduce((prev, cur) =>
    prev.concat(`INSERT IGNORE INTO genres(genre) VALUES ('${cur}');\r\n`), '');

const albumInsert = (data) => data.reduce(
    (prev, { id, name, artist_id: art, release_date: date }) =>
        prev.concat(
        `INSERT IGNORE INTO album(id, name) VALUES ('${id}', '${name}', '${art}', ${date});\r\n`,
        ), '',
);

const genereAlbumInsert = (data) => data.reduce((prev, [genre, album]) => prev.concat(
    `INSERT IGNORE INTO albumGenre(genre_id, album_id) VALUES (${genre}, '${album}');\r\n`,
), '');

const artistInsert = (data) => data.reduce((prev, { id, name }) =>
    prev.concat(`INSERT IGNORE INTO artist(id, name) VALUES ('${id}', '${name}');\r\n`), '');

const createFinalQuery = (playlist, users) => {
    const albuns = uniqueObjectByKey(playlist, 'album');
    const artists = uniqueObjectByKey(playlist, 'artist');
    const genres = uniqueGenres(albuns);
    const genresAlbunsRelation = genresAlbuns(genres, albuns);

    return createDB('Music') + createTables()
        + userInsert(users)
        + artistInsert(artists)
        + albumInsert(albuns)
        + playlist.reduce((prev, acc) => prev.concat(
            genericInsert('track', Object.keys(tableConstraintsObj.track),
                Object.values(acc.track)),
        ), '')
        + genresInsert(genres)
        + genereAlbumInsert(genresAlbunsRelation);
};

(async () => {
    const { playlistData, userArr } = await getPlaylistData();

    fs.writeFileSync(`./data/playlist-T${TURMA}.sql`, createFinalQuery(playlistData, userArr));
})();
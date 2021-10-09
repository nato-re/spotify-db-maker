/* eslint-disable sonarjs/no-duplicate-string */
const nonNomarlized = {
    id: 'INT NOT NULL PRIMARY KEY AUTO_INCREMENT',
    name: 'VARCHAR(28) NOT NULL',
    artist: 'VARCHAR(74)',
    album: 'VARCHAR(100)',
    duration: 'DOUBLE NOT NULL',
    release_date: 'DATETIME',
};

const genres = {
    id: 'INT NOT NULL PRIMARY KEY AUTO_INCREMENT',
    genre: 'VARCHAR(50) NOT NULL',
};

const user = {
    id: 'VARCHAR(100) NOT NULL PRIMARY KEY',
    display_name: 'VARCHAR(100) NOT NULL',
};

const artist = {
    id: 'VARCHAR(100) NOT NULL PRIMARY KEY',
    name: 'VARCHAR(100) NOT NULL',
};

const album = {
    id: 'VARCHAR(100) NOT NULL PRIMARY KEY',
    name: 'VARCHAR(100) NOT NULL',
    artist_id: 'VARCHAR(100) NOT NULL',
    release_date: 'DATETIME',
    fk: ['FOREIGN KEY (artist_id) REFERENCES artist(id)'],
};

const track = {
    id: 'VARCHAR(100) NOT NULL PRIMARY KEY',
    name: 'VARCHAR(100) NOT NULL',
    duration: 'DOUBLE NOT NULL',
    album_id: 'VARCHAR(100) NOT NULL',
    user_id: 'VARCHAR(100) NOT NULL',
    fk: ['FOREIGN KEY (album_id) REFERENCES album(id)',
    'FOREIGN KEY (user_id) REFERENCES user(id)'],
};

const albumGenre = {
    genre_id: 'INT NOT NULL',
    album_id: 'VARCHAR(100) NOT NULL',
    fk: ['PRIMARY KEY (genre_id, album_id)',
    'FOREIGN KEY (`genre_id`) REFERENCES genres(id)',
        'FOREIGN KEY (`album_id`) REFERENCES album(id)',
    ],
};

module.exports = {
    nonNomarlized,
    genres,
    user,
    artist,
    album,
    track,
    albumGenre,
};
const fs = require('fs');

const file = fs.readFileSync('./playlistT9Reboot.json');

const parsedFile = JSON.parse(file);

const genres = {};

// Crie uma função que recebe um parâmetro e retorna um Promise.
// A função deve logar o valor do parâmetro 
// Se o valor do parâmetro for maior que X, rejeite a promessa com 'essa não é a duração em horas da playlist', se for menor resolva ela o valor 
const X = 100;
const promissora = (valor) => {
  console.log(valor);
  return new Promise(((resolve, reject) => {
    if (valor < X) return resolve(valor);
    reject(Error('essa não é a duração em horas da playlist'));
  }));
};

const duracaoDaPlaylist = (
  parsedFile.reduce((acc, { duration }) => acc + duration, 0) / (60 * 60)).toFixed(2);

promissora(duracaoDaPlaylist);
parsedFile.forEach((song) => {
  const songGenres = song.album.genre;
  songGenres.forEach((genre) => {
    genres[genre] = genres[genre] ? genres[genre].concat(song.userId) : [song.userId];
  });
});

const genreWithMostTracks = Object.entries(genres).reduce((acc, [genre, peopleWhoAdded]) => {
  const genreData = { quantity: peopleWhoAdded.length, name: genre };
  return acc.quantity > genreData.quantity ? acc : genreData;
}, { quantity: 0 });

console.log(genreWithMostTracks);

1. Qual musica tem a duração 306.426?

`db.tracks.find({"track.duration": 306.426})`

2. Quem inseriu a musica do `Tyler, The Creator`?

`db.tracks.find({"artist.name": "Tyler, The Creator"},{ _id: 0 , "user.display_name": 1})`

3. Quais musicas tem o gênero `hip hop`?

`db.tracks.find({"album.genres": "hip hop"})`

4. Quais as musica com menor duração?

`db.tracks.find().sort({"track.duration": 1})`

5. Qual a musica com maior duração?

`db.tracks.find().sort({"track.duration": -1}).limit(1)`

6. Qual a musica mais antiga do gênero `pop`?

`db.tracks.find({"album.genres": "pop"}).sort({"album.release_date": 1}).limit(1)`

7. Qual a mais nova do gênero `bossa nova`?

`db.tracks.find({"album.genres": "bossa nova"}).sort({"album.release_date": -1}).limit(1)`

8. Quais musica tem gênero `russian post-punk` ou `lo-fi beats`?

`db.tracks.find({ $or:[{"album.genres": "russian post-punk"}, {"album.genres": "lo-fi beats"} ]})`

`db.tracks.find({ "album.genres": {$in: ["lo-fi beats", "russian post-punk"] } })`

9. Quais artistas e álbuns das musicas que tem gênero `mpb` e `manguebeat`?

`db.tracks.find({ $and: [ { "album.genres":  "mpb" }, { "album.genres": "manguebeat"} ] }, { "artist.name": 1, "album.name": 1, _id: 0 } )`

`db.tracks.find({ "album.genres": {$all: ["mpb", "manguebeat"] } }, { "artist.name": 1, "album.name": 1, _id: 0 })`

10. Quais os nome das musicas que tem duração maior que 5 min e 22 segundos e não incluem os gêneros `pop` nem `rock`?

`db.tracks.find({"track.duration": {$gt: 322 }, "album.genres": { $nin: ["pop", "rock"]}}, {"track.name": 1, _id: 0 } )`

11. Quais musicas e os usuários que colocaram elas que: tem mais de 6 min e sejam do milênio passado, ou tenham gênero `funk metal`?

`db.tracks.find({ $or:[{"track.duration": {$gt: 360}, "album.release_date": {$lt: "2000" }}, {"album.genres": "funk metal"}] })`
## Boas vindas ao Spotify DB Maker

Apartir do id de uma playlist do spotify e um token, os scripts `writeDataMongo.js`, `writeDataMysql.js` e `sqlNonNormalized.js`, escrevem queries para inserir essas playlists

O nome do arquivo (número/tribo da turma) gerado, a playlist base e o token, são extraído do arquivo `.env`

O `id` da playlist é a ultima parte da url da playlist:
<p>https://open.spotify.com/playlist/<b>7dtD3j0iVfSTkS8b6MgIiD</b></p>

O [link para conseguir token](https://developer.spotify.com/console/get-track/) é este, só clicar em `GET TOKEN` se autenticar com uma conta do Spotify e copiar do token do input

> Momentos para usar

- Bloco 19: Introdução à SQL 
    - `script` : [sqlNonNormalized.js](sqlNonNormalized.js)
    - dia 3: _Filtrando dados de forma específica_ (dia que aprendem a fazer buscas mais robustas)
    - dia 4: _Manipulando tabelas_ (pré projeto)

- Bloco 20: Funções SQL, Joins e Subqueries Mysql Normalized
    - `script` : [writeDataMysql.js](writeDataMysql.js)
    - dia 2: _Descomplicando JOINs, UNIONs e Subqueries_ (dia que aprendem juntar tabelas normalizadas)
    - dia 3: _Stored Routines & Stored Functions_ (pré projeto)

- Bloco 22: Introdução ao MongoDB 
    - `script` : [writeDataMongo.js](writeDataMongo.js)
    - dia 2: _Filter Operators_  (dia que aprendem a fazer buscas mais robustas)

- Bloco 24: MongoDB: Aggregation Framework 
    - `script` : [writeDataMongoAggregate.js](writeDataMongoAggregate.js)
    - dia 2: _Aggregation Framework - Parte 2_


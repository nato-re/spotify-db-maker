## Boas vindas ao Spotify DB Maker

Apartir do id de uma playlist do spotify e um token, os scripts `writeDataMongo.js`, `writeDataMysql.js` e `sqlNonNormalized.js`, escrevem queries para inserir essas playlists

O nome do arquivo (número/tribo da turma) gerado, a playlist base e o token, são extraído do arquivo `.env`, então popule o arquivo com as seguintes variáveis

`PLAYLIST_ID`

O `id` da playlist é a ultima parte da url da playlist:
<a href="https://open.spotify.com/playlist/7dtD3j0iVfSTkS8b6MgIiD"><p>https://open.spotify.com/playlist/<b>7dtD3j0iVfSTkS8b6MgIiD</b></p></a>

`TOKEN`

O [link para conseguir token](https://developer.spotify.com/console/get-track/) é este, só clicar em `GET TOKEN` se autenticar com uma conta do Spotify e copiar do token do input

> Momentos para usar

- Bloco 19: Introdução à SQL 
    - `script` : [writeSqlNonNormalized.js](mysql/writeNonNormalized.js)
    - dia 3: _Filtrando dados de forma específica_ (dia que aprendem a fazer buscas mais robustas)
    - [inspiração para exercícios](exercises/introdution-mysql.md)
    - dia 4: _Manipulando tabelas_ (pré projeto)

- Bloco 20: Funções SQL, Joins e Subqueries Mysql Normalized
    - `script` : [writeNormalizedMysql.js](mysql/writeNormalized.js)
    - [inspiração para exercícios](https://trybecourse.slack.com/archives/C01T2C18DSM/p1632174319141900)
    
    - dia 2: _Descomplicando JOINs, UNIONs e Subqueries_ (dia que aprendem juntar tabelas normalizadas)
    - dia 3: _Stored Routines & Stored Functions_ (pré projeto)

- Bloco 22: Introdução ao MongoDB 
    - `script` : [writeDataMongo.js](mongo/writeCommon.js)
    - [inspiração para exercícios](exercises/introdution-mongo.md)
    - dia 2: _Filter Operators_  (dia que aprendem a fazer buscas mais robustas)

- Bloco 24: MongoDB: Aggregation Framework 
    - `script` : [writeDataMongoAggregate.js](mongo/writeAggregation.js)
    - [inspiração para exercícios](exercises/mongoAggExample.mongodb)
    - dia 2: _Aggregation Framework - Parte 2_


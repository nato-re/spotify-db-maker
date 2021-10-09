-- SELECT * FROM tracks;
​
-- Musica com maior duração
SELECT * FROM tracks ORDER BY duration DESC LIMIT 1;
​
-- A música mais antiga da playlist
SELECT * FROM tracks ORDER BY YEAR(release_date) ASC LIMIT 1;
​
-- Qual o album e qual a música com o maior nome
SELECT * FROM tracks ORDER BY CHAR_LENGTH(name) DESC LIMIT 1;
SELECT * FROM tracks ORDER BY CHAR_LENGTH(album) DESC LIMIT 1;
​
-- Teste entre CHAR_LENGTH e LENGTH
SELECT CHAR_LENGTH(name), LENGTH(name), name FROM tracks;
​
-- Quais são as 3 música com maior duração lançadas no mês de Outubro
SELECT * FROM tracks WHERE MONTH(release_date) = 10 ORDER BY duration;
​
-- Quantas músicas a playlist possui?
SELECT COUNT(*) FROM tracks;
​
-- Quais músicas possuem a duração divisivel por 3 e resto 0?
 SELECT * FROM tracks WHERE duration MOD 3 = 0; -- DIV -> retorna a parte inteira da divisão enquanto / retorna tudo.
​
-- Qual o artista mais presente na playlist?
SELECT artist, COUNT(*) FROM tracks GROUP BY artist ORDER BY 2 DESC;
​
-- Exiba as 10 primeiras músicas com menor duração e seu mes de lançamento, 
-- mas apresente o mês em formato textual (Janeiro, Fevereiro, ... ) 
 SELECT 
    *,
    CASE MONTH(release_date)
        WHEN 1 THEN 'Janeiro'
        WHEN 2 THEN 'Fevereiro'
        WHEN 3 THEN 'Março'
        WHEN 4 THEN 'Abril'
        ELSE MONTHNAME(release_date)
    END AS 'Mês'
FROM
    tracks
ORDER BY duration; 
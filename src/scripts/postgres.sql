DROP TABLE IF EXISTS "tb_herois";
CREATE TABLE "tb_herois" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
  "nome" text NOT NULL,
  "poder" text NOT NULL
);

--create
INSERT INTO TB_HEROIS ( NOME, PODER)
VALUES
    ('Flash', 'Velocidade'),
    ('Batman', 'Dinheiro'),
    ('Superman', 'Força')

--read
select * from tb_herois;
select * from tb_herois where nome='flash';

-- update
update tb_herois
set nome= 'Goku', poder='deus' where id =1;

--delete
delete from tb_herois where id=1;
<div align="center">
  <img src="https://www.smashup.com/includes/images/logo.png?=v0.2" />
  
  # Smash-Double-API
</div>

## About - Sobre

> Um sistema simples que consegue utilizar a API do proprio smash double.

- Caso não exista/invalido o token ele roda um pequeno script feito com a biblioteca [puppeteer](https://www.npmjs.com/package/puppeteer) que captura o token das chamadas do proprio SmashUp e salva num arquivo chamado token.txt
- Caso o token exista e seja válido ele pega o token do arquivo token.txt e joga numa request do [node-fetch](https://www.npmjs.com/package/node-fetch) retornando um array de todas as cores da roleta atual.

## Usage - Uso

### No terminal:
```
  $ npm i
  $ node index.js
  
```
#### Caso não exista token ou seja inválido:
- <img src="https://user-images.githubusercontent.com/89656623/165190180-4e997a18-4db5-4d03-90f7-9d781a94f4b6.png" />

### Caso ele exista e seja válido:
- <img src="https://user-images.githubusercontent.com/89656623/165190423-1a935fa1-69d1-49f3-a017-4ffff016d056.png" />


## TODO LIST
[X] - Setup inicial

[X] - Sistema para capturar a roleta atual

[   ] - Criação de rotas rest

[   ] - POST Realizar apostas

[   ] - GET Informações do usuario

[   ] - GET Roleta atual/historico de apostas

## Mais informações
- Token tem válidade de no máximo 5 horas!
- Sistema de rotas ainda não criado, o projeto ainda esta no inicio.

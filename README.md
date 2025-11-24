🐉 DBZ App — Lista e Detalhes dos Personagens de Dragon Ball

Aplicativo mobile desenvolvido em Ionic + Angular, consumindo a API pública Dragon Ball API para exibir personagens, detalhes, estatísticas de poder e imagens em alta qualidade.

Este projeto foi criado como exercício de práticas modernas com Ionic, incluindo:

Pages independentes

Pipelines personalizados (pipes)

Diretivas customizadas

Layout responsivo

Uso de serviços para requisições HTTP

Navegação por rotas dinâmicas

🚀 Tecnologias Utilizadas

Ionic 7

Angular 17

TypeScript

RxJS

DragonBall-API

SCSS

📱 Funcionalidades
✔ Lista de personagens

Com imagens proporcionais e responsivas, carregamento dinâmico e chips de categoria (raça e gênero).

✔ Página de detalhes completa

Inclui:

Nome

Raça

Gênero

Afiliação

Descrição oficial da API

Ki atual

Ki máximo

Power Level com pipe personalizado

Cores dinâmicas baseadas na raça e poder

Tratamento de imagens quebradas

✔ Pipes personalizados

Exemplo:

powerLevel.pipe.ts → classifica Ki com base em ranges e formata valores.

✔ Diretivas

glow.directive.ts → efeito visual de brilho nos cards.

📂 Estrutura de Pastas
src/
 ├── app/
 │    ├── home/
 │    ├── character-details/
 │    ├── services/
 │    ├── pipes/
 │    ├── directives/
 │    └── app.routes.ts
 ├── global.scss
 └── main.ts

🌐 API Utilizada

Os dados vêm da API:

https://dragonball-api.com/api/characters


A página de detalhes consome:

https://dragonball-api.com/api/characters/{id}

🛠 Como rodar o projeto localmente
1. Clonar o repositório
git clone https://github.com/CidRVP/dbz-app

2. Instalar dependências
cd dbz-app
npm install

3. Rodar no navegador
ionic serve

4. Rodar em dispositivo físico ou emulador
ionic capacitor build android
ionic capacitor run android

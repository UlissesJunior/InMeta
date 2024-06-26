
<h1 align="center">
🃏🛒<br>InMeta- Projeto de Marketplace de Cartas
</h1>

Bem-vindo ao repositório do projeto de marketplace de cartas desenvolvido para a InMeta.
Este projeto utiliza React Vite Ts e outras ferramentas para fornecer um bom funcionamento do sistema. 
Clique na imagem abaixo para conferir o vídeo do sistema em ação.

<p align="center">
<a href="https://youtu.be/UEOokghJ_fY"><img src="src/assets/BannerInMetaMarketplace.png"></a>
<p>

<h4 align="center"><a href="https://inmeta-marketplace.vercel.app/">Clique para visitar o projeto</a></h4>

---

## Sumário  
1. [Introdução](#introdução)
2. [Páginas do Aplicativo](#páginas-do-aplicativo) 
3. [Bibliotecas e Dependências Utilizadas](#bibliotecas-e-dependências-utilizadas) 
4. [Possíveis Melhorias](#possíveis-melhorias) 
5. [Referências](#referências) 
6. [Agradecimentos](#agradecimentos) 

## Introdução 

Este projeto foi desenvolvido como parte do teste técnico para a posição de Desenvolvedor Front-End Pleno na InMeta. O objetivo principal é fazer com que o usuário consiga fazer todas as ações que o marketplace oferece através de sua API com uma boa acessibilidade e experiência visual.

## Páginas do Aplicativo

### Centro de trocas (Home)

Página inicial com uma visão geral do projeto, nele estão contidos a navbar e as solicitações de troca geradas pela API. O usuário só pode criar uma troca, aceitar uma troca ou favoritar um troca se estiver logado.

### Minhas Cartas

Página que contém as cartas do usuário logado. Permite que o usuário adicione cartas a sua coleção e coloque uma foto de perfil.

### Minhas Trocas

Página que recebe todas as trocas cadastradas pelo usuário no sistema.

### Meus Favoritos

Página que permite visualizar as trocas favoritas do usuário logado, essa gestão de dados acontece através do localStorage por um dado chave/valor.

### Histórico de Trocas

Página que permite visualizar o histórico de trocas do usuário logado, essa gestão de dados acontece através do localStorage por um dado chave/valor.

## Bibliotecas e Dependências Utilizadas

- react: ```^18.2.0```
-  axios: ```^1.7.2```
-  react-icons: ```^5.2.1```
- react-router-dom: ```^6.23.1```
- react-toastify: ```^10.0.5```
- tailwindcss: ```^3.4.4```
- typescript: ```^5.2.2```
- vite: ```^5.2.0```

## Possíveis melhorias
- Adição de Dark Mode para o usuário escolher
- Adição de novas animações no sistema
- Adição de testes automatizados no github actions
- Atualização da API para lidar com as ações de histórico de trocas, favoritos e foto do usuário
- Documentação dos componentes usando storybook
- Utilização de novas funções do React 19

## Referências
- [Scroll Infinito - Mario Soutinho](https://www.youtube.com/watch?v=lrot_otx2tA)
- [Novas Animações](https://developer.chrome.com/blog/new-in-web-ui-io-2024?hl=en)
- [Design Pattern](https://vinniciusgomes.medium.com/implementando-composition-pattern-em-aplicacoes-react-4e8dc92742ff)
 - [UI/UX](https://tailwindui.com)

## Agradecimentos

Deixo aqui o meu agradecimento ao CEO da InMeta Jonas Vargas pela oportunidade de participar desse processo seletivo e também ao CTO da InMeta Gabriel Peruchi que irá avaliar esse projeto.
Espero estar no mesmo time que vocês logo logo 💻
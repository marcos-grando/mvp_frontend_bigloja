### Desenvolvimento Full Stack - PUC-Rio

## MVP Back End com Flask + Interface React:
# Big Loja (loja virtual) 🛒

O objetivo do MVP foi desenvolver uma loja virtual, contemplando tanto a experiência do usuário quanto o gerenciamento administrativo do sistema. 

👤 Usuário: pode navegar entre produtos, filtrar por categoria ou preço, adicionar e manipular itens no carrinho, finalizar compras e acompanhar pedidos no histórico.

🛠️ Administrador: conta com um painel de controle que permite o cadastro e gerenciamento de produtos e categorias, além de visualizar todos os pedidos realizados (incluindo a opção de cancelamento de pedidos).

---

## 🛍️ Loja Virtual - Interface do Usuário (Frontend)

Este repositório representa a **interface web de uma loja virtual**, desenvolvida com **React.js**. Aqui é onde os usuários podem navegar pelos produtos, adicionar ao carrinho, realizar compras e consultar seus pedidos. Contendo também o painel administrativo. A proposta foi criar uma experiência simples e funcional de uma loja online.

---

## 🚀 Funcionalidades principais

- 📦 **Listagem de Produtos**  
  Os produtos são carregados de forma dinâmica através de uma API. Os usuários podem filtrar por categorias e valores (maior/menor).

- 🛒 **Carrinho de Compras**  
  Permite adicionar produtos, ajustar quantidades, remover itens e finalizar a compra com nome e CEP.

- 📜 **Histórico de Compras**  
  O cliente pode consultar pedidos anteriores com base no nome e CEP. Os status das entregas são atualizados automaticamente.

- ⚙️ **Painel Administrativo (Admin)**  
  Uma área interna para gerenciar produtos, categorias e visualizar todos os pedidos realizados.

---

## ⚙️ Tecnologias utilizadas

- **React.js** Biblioteca principal para construção da interface
- **Vite** Ferramenta de build e desenvolvimento local
- **React Router DOM** Navegação entre rotas (BrowserRouter, Routes, Route)
- **Swiper.js (Swiper Slide)** Biblioteca para criação de sliders/carrosséis responsivos
- **Axios** para comunicação com as APIs do backend

---

## 📁 Organização do projeto

- `App.jsx` – Onde as rotas e estrutura principal são definidas
- `src/components/` – Contém todos os componentes organizados por tipo (páginas, carrinho, admin, etc)
- `src/api_produtos.js` – Presente as funções para comunicação com as APIs em "backend_produtos"
- `src/api_categorias.js` – Presente as funções para comunicação com as APIs em "backend_categorias"
- `src/api_compras.js` – Presente as funções para comunicação com as APIs em "backend_compras"

---

## 🔍 Estrutura interna

- As chamadas à API estão separadas em arquivos (`api_categorias.js`, `api_compras.js`, `api_produtos.js`).
- Navegação feita com `react-router-dom` entre as seguintes rotas:
  - `/` → home
  - `/produtos` → listagem de produtos com filtro
  - `/carrinho` → visualização e finalização de compras
  - `/compras` → histórico das compras feitas
  - `/admin` → painel de controle administrativo

---

## 📦 Como rodar o projeto

Esse frontend funciona junto com as APIs feitas em Flask. Tudo é orquestrado pelo Docker.

### Estrutura do sistema:

- 🌐 **API externa**: [FakeStore](https://fakestoreapi.com/) → usada para popular a base com produtos fictícios. O modelo `Produto` foi estruturado com base nos dados dessa API (nome, valor, imagem, etc).
- 🔹 [`backend_categorias`](https://github.com/seu-usuario/backend_categorias) → responsável pelo cadastro e gerenciamento das categorias dos produtos
- 🔹 [`backend_produtos`](https://github.com/seu-usuario/backend_produtos) → responsável pelo gerenciamento dos produtos (incluindo uploads das imagens dos produtos)
- 🔹 [`backend_compras`](https://github.com/seu-usuario/backend_compras) → responsável por registrar e consultar compras feitas na loja
- 🔸 [`backend_shared`](https://github.com/seu-usuario/backend_shared) → módulo auxiliar compartilhado (banco de dados, pastas de upload, etc)
- 💠 [`frontend`] ← Você está nesse repositório

***OBS: `docker-compose`***
 - O sistema utiliza 3 APIs diferentes, com dependências entre os módulos
 - Por isso, é recomendado utilizar o `docker-compose`, que está nesse repositório (`frontend`)
 - Isso evita a necessidade de buildar e subir manualmente cada componente um por um

---

### ▶️ Passo a passo

1. Tenha o **Docker** instalado na máquina
2. Clone todos os repositórios acima na mesma pasta
3. No terminal, execute:

```bash
docker-compose up --build -d
```

---

## 🧠 Observações
Esse repositório faz parte de um MVP acadêmico. O sistema foi dividido em partes que se comunicam entre si por rotas. O backend foi feito com Flask (Python) e frontend com React.js.

### 🙋‍♂️ Autor
Desenvolvido por Marcos Grando ✌️

"""

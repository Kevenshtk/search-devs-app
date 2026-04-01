# 🔍 Search d_evs

Aplicação web desenvolvida em React que permite buscar usuários do GitHub e visualizar seus perfis e repositórios de forma organizada, com suporte a internacionalização (PT/EN) e ordenação dinâmica.

---

## 🚀 Tecnologias utilizadas

* React + Vite
* TypeScript
* Chakra UI
* React Router
* Axios
* Zod
* i18next (internacionalização)
* GitHub REST API

---

## ✨ Funcionalidades

* 🔎 Busca de usuários do GitHub
* 👤 Visualização de perfil do usuário
* 📦 Listagem de repositórios
* 🔄 Infinite scroll (carregamento automático)
* 🔃 Ordenação dos repositórios:

  * Mais recentes
  * Mais antigos
  * Nome
  * Último push
  
* 🌍 Internacionalização (Português e Inglês)
* ⚠️ Tratamento de erros (usuário não encontrado)
* 🎨 Interface responsiva e moderna

---

## 🔗 Acesse o projeto

👉 https://search-devs-app.vercel.app
---

## 🧠 Decisões técnicas

### 🔹 Uso de Zod

Utilizado para validação e tipagem dos dados vindos da API, garantindo maior segurança e previsibilidade.

### 🔹 Infinite Scroll

Implementado com controle de concorrência utilizando `useRef` para evitar múltiplas requisições simultâneas.

### 🔹 Internacionalização

Utilizado `i18next` para suporte a múltiplos idiomas, incluindo pluralização dinâmica.

### 🔹 Componentização

A aplicação foi estruturada em componentes reutilizáveis, como:

* `Navbar`
* `Sidebar`
* `SortSelect`
* `LanguageSwitcher`
* `ErrorState`

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
```

### 2. Acesse a pasta

```bash
cd nome-do-projeto
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o token do GitHub (opcional)

Crie um arquivo `.env`:

```env
VITE_GITHUB_TOKEN=seu_token_aqui
```

### 5. Execute o projeto

```bash
npm run dev
```

---

## 🌐 API utilizada

* https://api.github.com

---

## 📂 Estrutura do projeto

```
src/
 ├── components/
 ├── i18n/
 ├── pages/
 ├── routes/
 ├── schemas/
 └── services/
```

---

## 👨‍💻 Autor

Desenvolvido por **Keven Di Camargo Elpidio**

---

## 📄 Licença

Este projeto foi desenvolvido para fins de avaliação técnica.

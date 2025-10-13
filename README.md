# About Me – Portfólio Pessoal

> Projeto front-end para portfólio pessoal, desenvolvido com React, Vite e TypeScript.
>
> Permite apresentar seus trabalhos, habilidades e informações profissionais de forma moderna e responsiva.

---

## Como rodar o projeto

### 1. Rodando localmente (sem Docker)

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev -- --port 5175
   ```
3. Acesse em [http://localhost:5175](http://localhost:5175)

---

### 2. Rodando com Docker

1. Certifique-se de ter o Docker e Docker Compose instalados.
2. Suba o ambiente de desenvolvimento:
   ```bash
   docker compose up --build
   ```
3. O site estará disponível em [http://localhost:5175](http://localhost:5175)

---

### 3. Build de produção (Docker)

Para gerar uma imagem de produção, altere o serviço no `docker-compose.yml` para usar o estágio `prod` do Dockerfile, ou faça o build manual:

```bash
docker build -t about-me:prod --target prod .
docker run -p 5175:5175 about-me:prod
```

---

## Sobre o projeto

- Front-end: React + Vite + TypeScript
- Hot reload em desenvolvimento
- Pronto para deploy em ambiente Docker

---

Sinta-se à vontade!

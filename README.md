## Passo a Passo para Rodar o Projeto em Sua Máquina

1. **Criação do diretório para o projeto:**
   Crie uma pasta onde o back-end e o front-end serão colocados:
   ```bash
   mkdir project
   ```

2. **Acessar o diretório criado:**
   Entre na pasta `project`:
   ```bash
   cd project
   ```

3. **Clonar os repositórios do projeto:**
   Agora, clone os dois repositórios (back-end e front-end):
   ```bash
   git clone https://github.com/norberto-jn/nepchatbot-api
   git clone https://github.com/norberto-jn/nepchatbot-ui
   ```

4. **Copiar o arquivo `docker-compose.yaml`:**
   Copie o arquivo `docker-compose.yaml` de um dos repositórios (`nepchatbot-api` e `nepchatbot-ui`) e cole-os na raiz do diretório `project`.


5. **Instalar Docker Compose (caso necessário):**
   Se você não tem o Docker Compose instalado em sua máquina, siga o tutorial de instalação oficial [aqui](https://docs.docker.com/compose/install/).


6. **Rodar o Docker Compose:**
   Agora, dentro da pasta `project`, execute o comando:
   ```bash
   docker compose up -d
   ```

7. **Verificar se o projeto está rodando:**
   Após o Docker Compose subir os containers, você pode verificar o status do projeto com:
   ```bash
   docker compose ps
   ```

8. **Acessar a aplicação no navegador:**
   Abra um navegador de sua preferência e acesse a URL:
   ```
   http://localhost:3000
   ```
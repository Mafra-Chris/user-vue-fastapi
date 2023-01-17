# user-vue-fastapi

### Docker
```
docker-compose up -d --build
```

### Instalação para executar sem Docker

#### Front-End
Primeiro navegue para o diretório do front-end
```
cd services/frontend
```
E depois instale as dependências

```
pnpm install
```

#### Backend
Primeiro navegue para o diretório do back-end
```
cd services/backend
```
Instale as dependências: 
```
pip install -r requirements.txt
```
### Executar sem docker
#### Backend
```
uvicorn src.main:app --reload --host 0.0.0.0 --port 5000
```
Acesse em:
```
http://localhost:5000/
```
Swagger:
```
http://localhost:5000/docs
```
#### Frontend
```
pnpm run dev
```
Acesse em:
```
http://localhost:8080/
```
### Testes
#### Frontend
```
pnpm run test
```
ou
```
pnpm vitest
```


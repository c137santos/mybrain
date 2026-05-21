---
title: "Flask com MongoDB"
date: 2023-12-09
tags: [python, flask, mongodb, backend, api, nosql]
---

# Flask com MongoDB

Projeto de estudo: uma API Star Wars ("Astromech's Protocol Interstellar") construída com Flask e MongoDB.

## As tecnologias

**MongoDB** é um banco NoSQL organizado em documentos JSON/BSON. Frequentemente usado em MVPs pela flexibilidade do schema.

**Flask** é um microframework Python conhecido pela simplicidade e flexibilidade — uma boa rampa para quem quer evoluir para Django.

## Arquitetura em três camadas

```
serve.py       → Views, validações (Pydantic), endpoints REST
service.py     → Regras de negócio, acesso ao banco
models/        → BaseModels para o MongoDB
db.py          → Classe de configuração de acesso ao banco
tests/         → conftest, cobertura com coverage
```

Ferramentas de qualidade: **black** (formatação) e **ruff** (lint).

## Docker

`docker-compose.yml` configura três serviços: banco de dados, aplicação Flask e nginx como proxy reverso, com ambientes separados para teste e produção.

## Conexão com MongoDB

A classe `MongoDBConnection` funciona como wrapper com `@classmethod` para garantir uma única instância de conexão. Configurações (host, porta, usuário, senha) vêm de variáveis de ambiente com valores padrão.

```python
class MongoDBConnection:
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = MongoClient(
                host=os.getenv("MONGO_HOST", "localhost"),
                port=int(os.getenv("MONGO_PORT", 27017)),
                username=os.getenv("MONGO_USER"),
                password=os.getenv("MONGO_PASS"),
            )
        return cls._instance
```

## Estrutura do banco (desnormalização)

Filmes armazenam lista de nomes de planetas; planetas armazenam lista de filmes. Essa desnormalização é justificada pela raridade de exclusões e pela agilidade para MVPs.

## Validação com Pydantic

Pydantic cria `BaseModel`s que validam entradas antes do armazenamento. O `FlaskPydanticSpec` auxilia na documentação OpenAPI e aplica validações via decorador `@spec.validate`.

## Operações CRUD

```python
# Create
collection.insert_one(document)

# Update — com timestamp automático
collection.update_one(
    {"_id": id},
    {"$set": {**data, "updated_at": datetime.utcnow()}}
)

# Read — com filtro regex case-insensitive, paginação e ordenação
collection.find({"name": {"$regex": query, "$options": "i"}}) \
          .skip((page - 1) * page_size) \
          .limit(page_size)

# Delete
collection.delete_one({"_id": id})
```

## Paginação

```
skip = (página - 1) × tamanho_página
```

Padrão: 10 documentos por página.

## Serialização JSON customizada

`MongoJsonProvider` herda de `DefaultJSONProvider` para padronizar `datetime` e `ObjectId` antes da resposta:

```python
class MongoJsonProvider(DefaultJSONProvider):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)
```

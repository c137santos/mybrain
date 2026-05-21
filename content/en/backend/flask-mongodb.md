---
title: "Flask with MongoDB"
date: 2023-12-09
tags: [python, flask, mongodb, backend, api, nosql]
---

# Flask with MongoDB

A study project: a Star Wars API ("Astromech's Protocol Interstellar") built with Flask and MongoDB.

## The technologies

**MongoDB** is a NoSQL database organized in JSON/BSON documents. Often used in MVPs for its flexible schema.

**Flask** is a Python microframework known for simplicity and flexibility — a good stepping stone toward Django.

## Three-layer architecture

```
serve.py       → Views, validation (Pydantic), REST endpoints
service.py     → Business rules, database access
models/        → BaseModels for MongoDB
db.py          → Database connection configuration class
tests/         → conftest, coverage with coverage.py
```

Quality tooling: **black** (formatting) and **ruff** (linting).

## Docker

`docker-compose.yml` sets up three services: database, Flask app, and nginx as a reverse proxy, with separate environments for testing and production.

## MongoDB connection

The `MongoDBConnection` class acts as a wrapper using `@classmethod` to ensure a single connection instance. Config (host, port, user, password) comes from environment variables with defaults.

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

## Database design (denormalization)

Movies store a list of planet names; planets store a list of movies. This denormalization is justified by rare deletions and the speed needed to validate MVPs.

## Validation with Pydantic

Pydantic `BaseModel`s validate input before storage. `FlaskPydanticSpec` helps with OpenAPI documentation and applies validation via the `@spec.validate` decorator.

## CRUD operations

```python
# Create
collection.insert_one(document)

# Update — with automatic timestamp
collection.update_one(
    {"_id": id},
    {"$set": {**data, "updated_at": datetime.utcnow()}}
)

# Read — regex filter (case-insensitive), pagination, sorting
collection.find({"name": {"$regex": query, "$options": "i"}}) \
          .skip((page - 1) * page_size) \
          .limit(page_size)

# Delete
collection.delete_one({"_id": id})
```

## Pagination

```
skip = (page - 1) × page_size
```

Default: 10 documents per page.

## Custom JSON serialization

`MongoJsonProvider` inherits from `DefaultJSONProvider` to standardize `datetime` and `ObjectId` before the response:

```python
class MongoJsonProvider(DefaultJSONProvider):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)
```

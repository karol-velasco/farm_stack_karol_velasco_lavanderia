from motor.motor_asyncio import AsyncIOMotorClient
from models import Encargo, UpdateEncargo
from bson import ObjectId

cliente = AsyncIOMotorClient('mongodb://localhost')
database = cliente.lavanderia_database
coleccion = database.encargos

async def get_todos_encargos():
    encargos = []
    cursor = coleccion.find({})
    async for document in cursor:
        document['_id'] = str(document['_id']) 
        encargos.append(Encargo(**document))
    return encargos

async def get_encargo_por_id(id: str):
    task = await coleccion.find_one({'_id': ObjectId(id)})
    if task:
        task['_id'] = str(task['_id'])
        return task
    return None

async def create_encargo(encargo: dict):
    new_task = await coleccion.insert_one(encargo)
    created_task = await coleccion.find_one({'_id': new_task.inserted_id})
    if created_task:
        created_task['_id'] = str(created_task['_id'])
        return created_task

async def update_encargo(id: str, data: UpdateEncargo):
    encargo_dict = data.model_dump(by_alias=True, exclude_none=True)
    encargo_dict.pop('_id', None) # Evitamos sobreescribir el ID
    await coleccion.update_one({'_id': ObjectId(id)}, {'$set': encargo_dict})
    
    document = await coleccion.find_one({'_id': ObjectId(id)})
    if document:
        document['_id'] = str(document['_id'])
        return document

async def delete_encargo(id: str):
    await coleccion.delete_one({'_id': ObjectId(id)})
    return True

async def get_encargo_por_cliente(cliente: str):
    encargo = await coleccion.find_one({'cliente': cliente})
    return encargo
from fastapi import APIRouter, HTTPException
from bson import ObjectId
from database import (
    get_todos_encargos,
    get_encargo_por_id,
    get_encargo_por_cliente,
    create_encargo,
    update_encargo,
    delete_encargo
)
from models import Encargo, UpdateEncargo

encargo = APIRouter()

@encargo.get('/api/encargos')
async def get_encargos():
    encargos = await get_todos_encargos()
    return encargos

@encargo.post('/api/encargos')
async def save_encargo(encargos: Encargo):

    encargo_existente = await get_encargo_por_cliente(encargos.cliente)
    if encargo_existente:
        raise HTTPException(status_code=400, detail="El cliente ya tiene un encargo registrado")
    
    dict_encargo = encargos.model_dump()
    if dict_encargo.get('id') is None:
        del dict_encargo['id']
        
    respuesta = await create_encargo(dict_encargo)
    return respuesta

@encargo.get('/api/encargos/{id}', response_model=Encargo)
async def get_encargo(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="El formato del ID es inválido")
    
    item = await get_encargo_por_id(id)
    if item:
        return item
    raise HTTPException(status_code=404, detail=f"Encargo {id} no encontrado")

@encargo.put('/api/encargos/{id}', response_model=Encargo)
async def put_encargo(id: str, encargos: UpdateEncargo):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="El formato del ID es inválido")
    
    actualizado = await update_encargo(id, encargos)
    if actualizado:
        return actualizado
    raise HTTPException(status_code=404, detail=f"Encargo {id} no encontrado")

@encargo.delete('/api/encargos/{id}')
async def remove_encargo(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="El formato del ID es inválido")
    
    item = await get_encargo_por_id(id)
    if not item:
        raise HTTPException(status_code=404, detail=f"Encargo {id} no encontrado")
        
    await delete_encargo(id)
    return {"message": "Encargo borrado satisfactoriamente"}
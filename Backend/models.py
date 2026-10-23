from pydantic import BaseModel, Field, BeforeValidator
from typing import Optional, Annotated

PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if v is not None else v)]

class Encargo(BaseModel):
    id: Optional[str] = Field(None, alias='_id')
    cliente: str 
    tipo_prenda_lavado: str
    costo: float
    listo_para_entrega: bool = False

    class Config:
        from_attributes = True
        populate_by_name = True

class UpdateEncargo(BaseModel):
    cliente: Optional[str] = None
    tipo_prenda_lavado: Optional[str] = None
    costo: Optional[float] = None
    listo_para_entrega: Optional[bool] = None

    class Config:
        from_attributes = True
        populate_by_name = True
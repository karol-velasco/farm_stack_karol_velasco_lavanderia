from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
from router.encargos import encargo

app = FastAPI(
    title="API Lavandería - Control de Encargos",
    description="Sistema FullStack para control de lavandería"
)

origins = [
    config('FRONTEND_URL')
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def welcome():
    return {'message': 'Bienvenido a la API de Lavandería'}

app.include_router(encargo)
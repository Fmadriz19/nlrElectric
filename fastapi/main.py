from fastapi import FastAPI
from app.models.prueba import main
from pydantic import BaseModel # type: ignore

# Cors
from fastapi.middleware.cors import CORSMiddleware # type: ignore

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SearchProduct(BaseModel):
    message: str

@app.get("/view")
async def visualizar():

    resultados = 'conexion exitosa'
    return {"results": resultados}

@app.post("/productos")
async def products(request: str):

    resultados = main(request)
    return {"results": resultados}
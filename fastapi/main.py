from fastapi import FastAPI
from app.models.prueba import main

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

@app.get("/view")
async def visualizar():
    #return condition()
    resultados = 'conexion exitosa'
    return {"results": resultados}

@app.post("/productos")
async def products(request: str):
    #return condition()
    resultados = main(request)
    return {"results": resultados}
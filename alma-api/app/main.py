import os
from openai import AzureOpenAI
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Cargar variables del archivo .env
load_dotenv()

app = FastAPI()

# Permitir acceso desde frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Variables
AZURE_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")
AZURE_API_KEY  = os.getenv("AZURE_OPENAI_KEY")
DEPLOYMENT     = os.getenv("AZURE_DEPLOYMENT")

client = AzureOpenAI(
    api_version   ="2024-12-01-preview",
    azure_endpoint=AZURE_ENDPOINT,
    api_key       =AZURE_API_KEY,
)

# Modelo de entrada
class ChatRequest(BaseModel):
    message: str

# Endpoint de salud
@app.get("/health")
def health():
    return {"status": "ok"}

# Endpoint principal
@app.post("/chat")
async def chat(req: ChatRequest):

    try:
        response = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "Eres ALMA, el mejor asistente para labor científica. Siempre debes responder al usuario con texto claro."
                },
                {
                    "role": "user",
                    "content": req.message
                }
            ],
            max_completion_tokens=16384,
            model=DEPLOYMENT
        )

        reply = response.choices[0].message.content
        if not reply:
            reply = "El modelo no devolvió una respuesta. Intenta nuevamente con otra pregunta."

        return {
            "reply": reply
        }

    except Exception as e:
        print("ERROR:", str(e))
        return {"error": str(e)}
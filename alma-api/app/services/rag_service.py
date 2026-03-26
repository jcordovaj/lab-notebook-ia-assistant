import os
from app.services.llm_service import call_gpt4o
from app.services.embeddings import get_embedding
from app.services.prompt_service import load_prompt
from azure.search.documents import SearchClient
from azure.core.credentials import AzureKeyCredential

SYSTEM_PROMPT_RAG = load_prompt("system_rag.txt")

search_client = SearchClient(
    endpoint=os.getenv("AZURE_SEARCH_ENDPOINT"),
    index_name=os.getenv("AZURE_SEARCH_INDEX"),
    credential=AzureKeyCredential(os.getenv("AZURE_SEARCH_KEY"))
)

def rag_answer(query: str):

    docs = search_documents(query)

    if not docs:
        return "No hay información en la base de conocimiento"

    context = build_context(docs)

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT_RAG},
        {
            "role": "user",
            "content": f"Contexto:\n{context}\n\nPregunta:\n{query}"
        }
    ]

    return call_gpt4o(messages)

def search_documents(query: str):

    embedding = get_embedding(query)

    if embedding is None:
        return []

    results = search_client.search(
        search_text=None,
        vector=embedding,
        top=3,
        vector_fields="embedding"
    )

    docs = []
    for r in results:
        docs.append({
            "content": r["content"],
            "source": r["source"]
        })

    return docs
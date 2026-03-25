def route(query, files):
    if has_files:
        return "multimodal"
    
    if files:
        if any(f.type in ["pdf", "csv"] for f in files):
            return "rag"
        if any(f.type in ["image", "audio"] for f in files):
            return "multimodal"

    keywords = ["protocolo", "norma", "ética", "experimento", "biología", "ethics", "regulación", "manual"]
    if any(k in query.lower() for k in keywords):
        return "rag"

def route(query: str, has_files: bool):
    query_lower = query.lower()

    return "simple"


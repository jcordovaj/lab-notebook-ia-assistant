import base64

def build_multimodal_message(query, files):

    content = []

    # texto del usuario
    if query:
        content.append({
            "type": "text",
            "text": query
        })

    # archivos
    for file in files:
        # suponiendo que recibes base64 o bytes
        base64_image = encode_file(file)

        content.append({
            "type": "image_url",
            "image_url": {
                "url": f"data:image/png;base64,{base64_image}"
            }
        })

    return [
        {
            "role"   : "user",
            "content": content
        }
    ]
import base64

def encode_file(file):
    return base64.b64encode(file.file.read()).decode("utf-8")

def build_multimodal_message(query, files):

    content = []

    if query:
        content.append({
            "type": "text",
            "text": query
        })

    for file in files:
        if file.filename.lower().endswith((".png", ".jpg", ".jpeg")):

            base64_image = encode_file(file)

            content.append({
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/png;base64,{base64_image}"
                }
            })

    return [
        {
            "role": "user",
            "content": content
        }
    ]
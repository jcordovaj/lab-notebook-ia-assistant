from openai import AzureOpenAI
import os

client = AzureOpenAI(
    api_version="2024-12-01-preview",
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_KEY"),
)

def call_gpt4o(messages):
    return client.chat.completions.create(
        model=os.getenv("AZURE_DEPLOYMENT_GPT4O"),
        messages=messages,
        max_completion_tokens=1500
    )

def call_nano(messages):
    return client.chat.completions.create(
        model=os.getenv("AZURE_DEPLOYMENT_NANO"),
        messages=messages,
        max_completion_tokens=300
    )
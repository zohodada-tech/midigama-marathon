import time
from openai import OpenAI

client = OpenAI(timeout=60)

for i in range(3):
    try:
        response = client.chat.completions.create(
            model="gpt-4.1",
            messages=messages,
            stream=False
        )
        break
    except Exception as e:
        print("retry...", e)
        time.sleep(2)

import asyncio
import websockets
import json


async def connect_to_websocket():
    uri = "ws://localhost:8001/notification/ws"

    async with websockets.connect(uri) as websocket:
        message = {"text": "test123",
                   "status": True,
                   "receiver": 1}
        message = json.dumps(message)
        await websocket.send(message)
        print(f"Sent: {message}")
        response = await websocket.recv()
        print(f"Received: {response}")


asyncio.run(connect_to_websocket())

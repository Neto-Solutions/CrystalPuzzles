from fastapi import FastAPI, Depends

from src.auth.router import router as auth_routers

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


app.include_router(auth_routers)

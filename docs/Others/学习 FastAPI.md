学习 FastAPI，可以按照以下步骤进行，从基础到深入逐步掌握：

---

## **1. 基础入门**
### **（1）了解 FastAPI 的特点**
FastAPI 是一个基于 Python 3.7+ 的高性能 Web 框架，具有以下特点：
- **异步支持**（基于 `async` / `await`）
- **自动生成 OpenAPI 和 API 文档**
- **Pydantic 数据验证**
- **比 Flask / Django 更快**

### **（2）安装 FastAPI**
```sh
pip install fastapi[all]
```
`[all]` 选项安装了 `uvicorn`，用于运行 FastAPI 服务器。

### **（3）编写第一个 FastAPI 项目**
创建 `main.py`:
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI!"}
```
运行：
```sh
uvicorn main:app --reload
```
浏览器访问 `http://127.0.0.1:8000/`，或者查看 API 文档：
- **Swagger UI**：`http://127.0.0.1:8000/docs`
- **ReDoc**：`http://127.0.0.1:8000/redoc`

---

## **2. 路由和请求处理**
### **（1）路径参数**
```python
@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
```
访问 `http://127.0.0.1:8000/items/42`，返回 `{"item_id": 42}`。

### **（2）查询参数**
```python
@app.get("/users/")
async def read_user(name: str, age: int):
    return {"name": name, "age": age}
```
访问 `http://127.0.0.1:8000/users/?name=Tom&age=25`。

---

## **3. 请求体和数据验证**
### **（1）使用 Pydantic 进行数据验证**
```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    in_stock: bool = True

@app.post("/items/")
async def create_item(item: Item):
    return {"message": f"Item '{item.name}' created", "data": item}
```
使用 `curl` 测试：
```sh
curl -X 'POST' 'http://127.0.0.1:8000/items/' -H 'Content-Type: application/json' -d '{"name": "Laptop", "price": 899.99}'
```

---

## **4. 中间件、依赖注入、认证**
### **（1）中间件**
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### **（2）依赖注入**
```python
from fastapi import Depends

def common_params(q: str = "default"):
    return {"q": q}

@app.get("/search/")
async def search(params: dict = Depends(common_params)):
    return params
```

### **（3）认证（OAuth2 + JWT）**
```python
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/users/me/")
async def read_users_me(token: str = Depends(oauth2_scheme)):
    return {"token": token}
```

---

## **5. FastAPI + 数据库（SQLAlchemy）**
安装 SQLAlchemy：
```sh
pip install sqlalchemy databases asyncpg
```
定义数据库连接：
```python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```

定义模型：
```python
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
```

创建数据库：
```python
Base.metadata.create_all(bind=engine)
```

---

## **6. 部署 FastAPI**
### **（1）使用 Uvicorn 生产环境运行**
```sh
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### **（2）使用 Docker 部署**
创建 `Dockerfile`：
```dockerfile
FROM python:3.9
WORKDIR /app
COPY . /app
RUN pip install fastapi uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```
构建并运行：
```sh
docker build -t fastapi-app .
docker run -d -p 8000:8000 fastapi-app
```

---

## **7. 进阶学习**
- **WebSocket**
- **GraphQL（使用 Strawberry）**
- **Celery + FastAPI**
- **分布式任务队列**
- **Kubernetes 部署**

---

## **推荐学习资源**
- **FastAPI 官方文档**: [https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/)
- **实战教程**: [https://realpython.com/fastapi-python-web-apis/](https://realpython.com/fastapi-python-web-apis/)
- **GitHub 项目**: [https://github.com/tiangolo/fastapi](https://github.com/tiangolo/fastapi/)

如果你想深入学习某个方面，可以告诉我，我可以提供更详细的教程！ 🚀
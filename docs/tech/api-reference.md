
# API 参考

本页面提供产品的 API 接口参考文档。

## 基础 URL

```
https://api.juxi-tech.com/v1
```

## 认证

使用 API Key 进行认证：

```http
Authorization: Bearer YOUR_API_KEY
```

## 接口列表

### 获取设备信息

```http
GET /device/info
```

响应示例：

```json
{
  "id": "device-001",
  "name": "Juxi Device",
  "status": "online"
}
```


# API 參考

本頁面提供產品的 API 接口參考文檔。

## 基礎 URL

```
https://api.juxi-tech.com/v1
```

## 認證

使用 API Key 進行認證：

```http
Authorization: Bearer YOUR_API_KEY
```

## 接口列表

### 獲取設備信息

```http
GET /device/info
```

響應示例：

```json
{
  "id": "device-001",
  "name": "Juxi Device",
  "status": "online"
}
```

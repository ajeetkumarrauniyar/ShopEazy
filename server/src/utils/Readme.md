Here's a complete **Markdown Guide** for the Express Router Code using `asyncHandler`, explaining each example in a structured and developer-friendly way:

---

# 📘 Express Router with asyncHandler – Developer Guide

This guide demonstrates how to use a custom `asyncHandler` in your Express routes for cleaner, consistent error handling and response formatting. Each example covers a different use case, from basic CRUD operations to streaming responses.

---

## 🚀 Setup

* **Dependencies assumed:**

  * Express
  * A custom `asyncHandler`
  * A custom `ApiError` class
  * Service layers: `UserService`, `ProductService`

---

## 🛠 Examples

### ✅ Example 1: GET All Users

```ts
router.get('/users', asyncHandler(async (req, res, next) => {
  const users = await userService.findAll(req.query);
  return users;
}));
```

* **Use Case**: Fetch all users, possibly with filters.
* **Response**: Auto-sent by `asyncHandler`.

---

### ➕ Example 2: Create New User

```ts
router.post('/users', asyncHandler(async (req, res) => {
  const userData = req.body;
  if (!userData.email) {
    throw new ApiError(400, 'Email is required');
  }
  const newUser = await userService.create(userData);
  return newUser;
}));
```

* **Use Case**: Create a user with validation.
* **Error Handling**: Throws `ApiError` if `email` is missing.

---

### 🔍 Example 3: GET User by ID

```ts
router.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await userService.findById(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');
  return user;
}));
```

* **Use Case**: Retrieve a user.
* **Error Handling**: If not found, throw 404 error.

---

### 🔐 Example 4: Admin Route with `next()`

```ts
router.get('/admin', asyncHandler(async (req, res, next) => {
  if (!req.user?.isAdmin) {
    return next(new ApiError(403, 'Admin access required'));
  }
  const stats = await userService.getAdminStats();
  return stats;
}));
```

* **Use Case**: Secure admin route.
* **Error Handling**: Uses `next()` to pass to Express error middleware.

---

### ❌ Example 5: Delete User with Try/Catch

```ts
router.delete('/users/:id', asyncHandler(async (req, res) => {
  try {
    await userService.delete(req.params.id);
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
}));
```

* **Use Case**: Delete a user.
* **Error Handling**: Uses `try/catch` for additional context.

---

### 🛒 Example 6: Create Order

```ts
router.post('/orders', asyncHandler(async (req, res) => {
  const { userId, products } = req.body;
  const order = await productService.createOrder(userId, products);
  res.status(201);
  return order;
}));
```

* **Use Case**: Create an order.
* **Custom Status**: Returns 201 (Created).

---

### 📁 Example 7: Upload Avatar

```ts
router.post('/users/:id/avatar', asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No file uploaded');
  }
  const avatarUrl = await userService.uploadAvatar(req.params.id, req.file);
  return { avatarUrl };
}));
```

* **Use Case**: File upload via `multipart/form-data`.

---

### 🖥️ Example 8: Server Status Check

```ts
router.get('/server-status', asyncHandler(async () => {
  const status = await checkServerStatus();
  return { status, timestamp: new Date() };
}));
```

* **Use Case**: Lightweight server ping route.
* **Note**: Doesn't need `req` or `res`.

---

### 📦 Example 9: GET Product with Custom Headers

```ts
router.get('/products/:id', asyncHandler(async (req, res) => {
  const product = await productService.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');
  res.setHeader('Cache-Control', 'public, max-age=300');
  return product;
}));
```

* **Use Case**: Product lookup with caching headers.

---

### 📤 Example 10: Streaming Data Export

```ts
router.get('/large-data-export', asyncHandler(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Transfer-Encoding', 'chunked');
  await productService.streamLargeDataTo(res);
}));
```

* **Use Case**: Stream large dataset directly to client.
* **Note**: No return needed; response is manually handled.

---

## 📚 Bonus: Utility Overview

### `asyncHandler`

Wraps async route handlers to:

* Catch thrown errors
* Automatically send JSON responses
* Avoid repetitive `try/catch`

```ts
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).then(data => {
    if (!res.headersSent && data !== undefined) {
      res.status(res.statusCode || 200).json({ success: true, data });
    }
  }).catch(next);
```

### `ApiError`

A custom error class to standardize error responses:

```ts
export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
```

---

## ✅ Summary

| Example | Feature                    | Notes                    |
| ------- | -------------------------- | ------------------------ |
| 1       | Basic GET with query       | Cleanest usage           |
| 2       | POST with validation       | Custom error handling    |
| 3       | GET with not-found check   | Standard API pattern     |
| 4       | Admin guard with `next()`  | Middleware chaining      |
| 5       | Delete with try/catch      | Custom error message     |
| 6       | POST with status code      | Custom status 201        |
| 7       | File upload check          | Useful for avatars, docs |
| 8       | Lightweight no-param usage | Ping-like endpoints      |
| 9       | Headers before response    | Adds caching logic       |
| 10      | Manual streaming           | AsyncHandler bypassed    |

---


# 📘 Controller Functions Guide (with `asyncHandler`, `ApiError`, and `ApiResponse`)

This guide covers three examples of Express controller logic using a clean and consistent structure with the `asyncHandler` utility. It includes built-in error handling, standard and custom responses, and best practices for API development.

---

## 🔄 Common Imports

```ts
import { Request, Response } from "express";
import { asyncHandler, ApiResponse, ApiError } from "@/utils/index.ts";
```

These utilities provide:

* ✅ `asyncHandler`: Wraps async functions, handles errors, and sends auto-responses
* ❌ `ApiError`: Custom error class with status codes and structured messages
* 📦 `ApiResponse`: Utility to send manually controlled API responses

---

## ✅ 1. `healthCheck` Controller

```ts
export const healthCheck = asyncHandler(async () => {
  return {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
});
```

* **Purpose**: Simple API to check if the server is running
* **Features**:

  * No `req` or `res` needed
  * Returns health info automatically wrapped in a JSON response
* **Use Case**: `/health` or `/status` endpoint

---

## 👤 2. `getUserProfile` Controller

```ts
export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (!userId) {
    throw ApiError.badRequest("User ID is required");
  }

  try {
    if (userId === "404") throw ApiError.notFound(`User with ID ${userId} not found`);
    if (userId === "403") throw ApiError.forbidden("You don't have permission to access this user");
    if (userId === "500") throw new Error("Database connection error");

    if (userId === "custom") {
      return ApiResponse.success(
        res,
        { id: userId, name: "Custom User", type: "special" },
        "Custom response",
        201
      );
    }

    return {
      id: userId,
      name: "Example User",
      email: "user@example.com",
      role: "user",
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw ApiError.internal("Error retrieving user profile", [(error as Error).message]);
  }
});
```

* **Purpose**: Fetch user details by ID
* **Behavior**:

  * Multiple simulated error cases (`404`, `403`, `500`)
  * Returns either standard or custom response
* **Best Practice**: Use named methods like `ApiError.badRequest`, `ApiError.notFound` for clarity

---

## 📦 3. `createItem` Controller

```ts
export const createItem = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const errors = [];
  if (!name) errors.push("Name is required");
  if (!description) errors.push("Description is required");

  if (errors.length > 0) {
    throw ApiError.badRequest("Validation failed", errors);
  }

  const newItem = {
    id: Date.now().toString(),
    name,
    description,
    createdAt: new Date(),
  };

  ApiResponse.success(res, newItem, "Item created successfully", 201);
});
```

* **Purpose**: Create a new item with validation
* **Key Features**:

  * Custom validation with multiple error messages
  * Manual response using `ApiResponse.success`
* **Best Use Case**: Forms or content creation endpoints

---

## 🔁 Utility Reference

### 🧩 `asyncHandler(fn)`

Wraps any async route/controller to:

* Catch errors and pass to middleware
* Send response automatically (if not manually sent)

### ❗ `ApiError`

Custom error class methods:

```ts
ApiError.badRequest(message: string, details?: any[])
ApiError.notFound(message: string)
ApiError.forbidden(message: string)
ApiError.internal(message: string, details?: any[])
```

### 📤 `ApiResponse.success`

Manually send structured success responses:

```ts
ApiResponse.success(res, data, message = "Success", statusCode = 200);
```

---

## 📌 Summary Table

| Controller       | Purpose                     | Highlights                                               |
| ---------------- | --------------------------- | -------------------------------------------------------- |
| `healthCheck`    | Health status check         | Concise and auto-handled response                        |
| `getUserProfile` | User fetch with logic paths | Handles different errors and uses manual/custom response |
| `createItem`     | Create new resource         | Manual validation and response with errors               |

---


# Blog-App

Blog App allow user to write blog and see other user blogs.

## API Reference

#### User register

```http
  POST /api/auth/register
```

| Parameter              | Type     | Description          |
| :--------------------  | :------- | :------------------- |
| `name`                 | `string` | **Required**.        |
| `email`                | `string` | **Required**.        |
| `password`             | `string` | **Required**.        |

#### User login

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `password`    | `string` | **Required**.                     |
| `email`   | `string` | **Required**.                     |

#### Get user profile

```http
  GET  /api/dashboard
```
Headers
| Parameter        | Type                  | Description   |
| :--------        | :------------------   | :-------------|
| `accept`         | `application/json`    | **Required**. |
| `authorization`  | `Bearer` Token        | **Required**. |

#### Get user blog

```http
  GET  /api/blog
```



## Run Locally

Clone the project

```bash
  git clone https://github.com/arihant-getgrahak/blog-app-frontend
```

Go to the project directory

```bash
  cd blog-app-frontend
```

Install dependencies

```bash
  yarn || npm install
```

Start the server

```bash
  yarn dev || npm run dev
```

## Tech Stack

**Client:** NextJs

**Server:** Laravel

## Contributing

1. [@arihant-getgrahak](https://github.com/arihant-getgrahak)
2. [@sonaljain01](https://github.com/sonaljain01)


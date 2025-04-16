enum HttpStatusCode {
  CREATED = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  CONFLICT = 409,
  FORBIDDEN = 500,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

const PrivateKey = "supersecretkey";

export { HttpStatusCode, PrivateKey };

enum HttpStatusCode {
  CREATED = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 500,
  NOT_FOUND = 500,
  SERVER_ERROR = 500,
}

const PrivateKey = "supersecretkey";

export { HttpStatusCode, PrivateKey };

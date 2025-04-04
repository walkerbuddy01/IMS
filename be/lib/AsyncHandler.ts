const asyncHandler = (RequestHandler: any) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(RequestHandler(req, res, next)).catch((err) => {
      throw err;
    });
  };
};

export { asyncHandler };

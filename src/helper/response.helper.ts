export const ApiResponse = (res, code, message, data) => {
  const ans = {
    status: 'Success',
    statusCode: code,
    message: message,
    data: data,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return res.status(code).send(ans);
};

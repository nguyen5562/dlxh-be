export const ApiResponse = (res, status, code, message, data) => {
  const ans = {
    input_correct: status,
    statusCode: code,
    message: message,
    data: data,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return res.status(code).send(ans);
};

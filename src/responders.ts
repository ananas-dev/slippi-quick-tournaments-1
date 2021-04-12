interface Response {
  type: string;
  message?: string;
}

export function success(message?: string): Response {
  return {
    type: "success",
    message: message
  };
}

export function error(message: string): Response {
  return {
    type: "error",
    message: message,
  };
}

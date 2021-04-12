import { success, error } from "./responders";

// Commands with args

interface ConnectCommand {
  id: number;
}

interface QueueCommand {
  mode: string;
}

export function handleMessage(message: string): string {
  const args = message.split(" ");
  let response: any;

  switch (args[0]) {
    case "connect":
      if (args[1]) {
        response = success();
      } else {
        response = error("missing id");
      }
  }

  return JSON.stringify(response);
}

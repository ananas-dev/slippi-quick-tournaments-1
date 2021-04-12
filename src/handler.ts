import { success, error } from "./responders";
import { connect } from "./commands";

export function handleMessage(req: string): string {
  const json = JSON.parse(req);
  let res: any;

  switch (json.command) {
    case "connect":
      connect(json.data);
  }

  return JSON.stringify(res);
}

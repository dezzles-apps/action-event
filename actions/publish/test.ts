import EventPoster from "./event-poster.ts";
import Event from "./model/event.ts";
import Client from "../common/client.ts";
import { readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const client = new Client(
  JSON.parse(readFileSync(join(homedir(), ""), "utf-8")),
);
await client.init();
const poster = new EventPoster(client.getClient());
console.log("EventPoster initialized with client");
const event = new Event(
  "my-org",
  "my-repo",
  123,
  "Build message",
  "refs/heads/main",
);
await poster.postEvent(event);

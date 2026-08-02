import EventPoster from "./event-poster.ts";
import Event from "./model/event.ts";
import { readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const credentialsPath = join(homedir(), "");
const credentialsJson = JSON.parse(readFileSync(credentialsPath, "utf-8"));
const poster = new EventPoster(credentialsJson);
console.log("EventPoster initialized with credentials");
await poster.init();
console.log("EventPoster initialized with token:");
const event = new Event(
  "my-org",
  "my-repo",
  123,
  "Build message",
  "refs/heads/main",
);
await poster.postEvent(event);

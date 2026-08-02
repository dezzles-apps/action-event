import * as core from "@actions/core";

import EventPoster from "./event-poster.ts";
import Event from "./model/event.ts";

const credentialsJson = core.getInput("credentialsJson");
const message = core.getInput("message");
const component = core.getInput("component")
  ? core.getInput("component")
  : "default";
const ref = process.env.GITHUB_REF_NAME;
const repository = process.env.GITHUB_REPOSITORY;
const runId = process.env.GITHUB_RUN_NUMBER;

const event = new Event(
  repository?.split("/")[0] ?? "",
  repository?.split("/")[1] ?? "",
  parseInt(runId ?? "0"),
  message,
  ref ?? "",
  component,
);
core.info(`Posting event with the following:
  organisation: ${event.organisation}
  repository: ${event.repository}
  buildNumber: ${event.buildNumber}
  message: ${event.message}
  ref: ${event.ref}
  component: ${event.component}
`);

async function run() {
  try {
    const post = new EventPoster(credentialsJson);
    core.info("Initialising EventPoster");
    await post.init();
    core.info("EventPoster initialised");
    await post.postEvent(event);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error}`);
  }
}

run();

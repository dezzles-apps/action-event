import * as core from "@actions/core";

import EventPoster from "./event-poster.ts";
import Event from "./model/event.ts";
import Client from "../common/client.ts";
const credentialsJson = JSON.parse(core.getInput("credentialsJson"));

const message = core.getInput("message");
const component = core.getInput("component")
  ? core.getInput("component")
  : "default";
const ref = process.env.GITHUB_REF_NAME;
const repository = process.env.GITHUB_REPOSITORY;
const runId = `gh-${process.env.GITHUB_RUN_ID}`;
const runNumber = process.env.GITHUB_RUN_NUMBER;


const event = new Event(
  repository?.split("/")[0] ?? "",
  repository?.split("/")[1] ?? "",
  parseInt(runNumber ?? "0"),
  runId,
  message,
  ref ?? "",
  component,
);
core.info(`Posting event with the following:
  organisation: ${event.organisation}
  repository: ${event.repository}
  buildNumber: ${event.buildNumber}
  buildId: ${event.sourceBuildId}
  message: ${event.message}
  ref: ${event.ref}
  component: ${event.component}
`);

async function run() {
  try {
    const client = new Client(credentialsJson);
    core.info("Initialising Client");
    await client.init();
    core.info("Client initialised");
    const post = new EventPoster(client.getClient());
    await post.postEvent(event);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error}`);
  }
}

run();

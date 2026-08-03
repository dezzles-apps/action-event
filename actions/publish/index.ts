import * as core from "@actions/core";
import fs from "fs";
import PublishPoster from "./publish-poster.ts";
import PublishEvent from "./model/publish-event.ts";
import AppConfig from "./model/app-config.ts";
import Client from "../common/client.ts";
import { load } from "js-yaml";
const credentialsJson = JSON.parse(core.getInput("credentialsJson"));

const repository = process.env.GITHUB_REPOSITORY;
const version = core.getInput("version");

if (!fs.existsSync("project.yml")) {
  core.setFailed("project.yml not found in the root of the repository");
  throw new Error("project.yml not found in the root of the repository");
}

const projectYml = fs.readFileSync("project.yml", "utf8");
const projectConfig = load(projectYml) as AppConfig;

const event = new PublishEvent(
  projectConfig.name,
  version,
  projectConfig.publish,
  `https://github.com/${repository}`,
);

async function run() {
  try {
    const client = new Client(credentialsJson);
    core.info("Initialising Client");
    await client.init();
    core.info("Client initialised");
    const post = new PublishPoster(client.getClient());
    await post.postEvent(event);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error}`);
  }
}

run();

import { g as getInput, i as info, C as Client, s as setFailed } from './client-BNBqSQZh.js';
import 'os';
import 'crypto';
import 'fs';
import 'path';
import 'http';
import 'https';
import 'net';
import 'tls';
import 'events';
import 'assert';
import 'util';
import 'node:assert';
import 'node:net';
import 'node:http';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:querystring';
import 'node:events';
import 'node:diagnostics_channel';
import 'node:tls';
import 'node:zlib';
import 'node:perf_hooks';
import 'node:util/types';
import 'node:worker_threads';
import 'node:url';
import 'node:async_hooks';
import 'node:console';
import 'node:dns';
import 'string_decoder';
import 'child_process';
import 'timers';
import 'stream';
import 'process';
import 'querystring';
import 'buffer';

class EventPoster {
    client;
    constructor(client) {
        this.client = client;
    }
    url = "https://non.build-engine.dezzles-test.com";
    async postEvent(event) {
        console.log("Posting event to", `${this.url}/api/v1/events`);
        await this.client
            .fetch({
            url: `${this.url}/api/v1/events`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to post event: ${response.status} ${response.statusText}`);
            }
        });
    }
}

class Event {
    organisation;
    repository;
    buildNumber;
    buildId;
    message;
    ref;
    component;
    buildUrl;
    constructor(organisation, repository, buildNumber, buildId, message, ref, component) {
        this.organisation = organisation;
        this.repository = repository;
        this.buildNumber = buildNumber;
        this.buildId = buildId;
        this.message = message;
        this.ref = ref;
        this.component = component ? component : "default";
        this.buildUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;
    }
}

const credentialsJson = JSON.parse(getInput("credentialsJson"));
const message = getInput("message");
const component = getInput("component")
    ? getInput("component")
    : "default";
const ref = process.env.GITHUB_REF_NAME;
const repository = process.env.GITHUB_REPOSITORY;
const runId = `gh-${process.env.GITHUB_RUN_ID}`;
const runNumber = process.env.GITHUB_RUN_NUMBER;
const event = new Event(repository?.split("/")[0] ?? "", repository?.split("/")[1] ?? "", parseInt(runNumber ?? "0"), runId, message, ref ?? "", component);
info(`Posting event with the following:
  organisation: ${event.organisation}
  repository: ${event.repository}
  buildNumber: ${event.buildNumber}
  buildId: ${event.buildId}
  message: ${event.message}
  ref: ${event.ref}
  component: ${event.component}
`);
async function run() {
    try {
        const client = new Client(credentialsJson);
        info("Initialising Client");
        await client.init();
        info("Client initialised");
        const post = new EventPoster(client.getClient());
        await post.postEvent(event);
    }
    catch (error) {
        setFailed(`Action failed with error: ${error}`);
    }
}
run();
//# sourceMappingURL=event.js.map

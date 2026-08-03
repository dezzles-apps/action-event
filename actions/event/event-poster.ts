import type { IdTokenClient } from "google-auth-library";
import Event from "./model/event.ts";
export class EventPoster {
  client: IdTokenClient;
  constructor(client: IdTokenClient) {
    this.client = client;
  }
  url: string = "https://non.build-engine.dezzles-test.com";

  async postEvent(event: Event) {
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
          throw new Error(
            `Failed to post event: ${response.status} ${response.statusText}`,
          );
        }
      });
  }
}

export default EventPoster;

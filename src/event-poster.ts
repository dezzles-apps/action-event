import { GoogleAuth, IdTokenClient } from "google-auth-library";
import Event from "./model/event.ts";
export class EventPoster {
  credentialsJson: string;
  auth: GoogleAuth;
  client: IdTokenClient = null as any;
  url: string = "https://non.build-engine.dezzles-test.com";
  constructor(credentialsJson: string) {
    this.credentialsJson = credentialsJson;
    this.auth = new GoogleAuth({
      credentials: this.credentialsJson,
    });
  }
  async init() {
    this.client = await this.auth.getIdTokenClient("build-engine");
  }

  async postEvent(event: Event) {
    await this.client.fetch({
      url: `${this.url}/api/v1/events`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
  }
}

export default EventPoster;

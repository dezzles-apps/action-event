import { GoogleAuth, IdTokenClient } from "google-auth-library";

export class Client {
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

  getClient(): IdTokenClient {
    return this.client;
  }
}

export default Client;

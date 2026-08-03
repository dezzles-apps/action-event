import PublishConfig from "./publish-config.ts";

class PublishEvent {
  name: string;
  version: string;
  config: PublishConfig;
  repositoryUrl: string = "";

  constructor(
    name: string,
    version: string,
    config: PublishConfig,
    repositoryUrl: string,
  ) {
    this.name = name;
    this.version = version;
    this.config = config;
    this.repositoryUrl = repositoryUrl;
  }
}

export default PublishEvent;

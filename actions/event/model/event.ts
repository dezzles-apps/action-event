class Event {
  organisation: string;
  repository: string;
  buildNumber: number;
  buildId: string;
  message: string;
  ref: string;
  component: string;
  buildUrl: string;

  constructor(
    organisation: string,
    repository: string,
    buildNumber: number,
    buildId: string,
    message: string,
    ref: string,
    component?: string,
  ) {
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

export default Event;

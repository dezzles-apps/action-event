class Event {
  organisation: string;
  repository: string;
  buildNumber: number;
  buildId: string;
  message: string;
  ref: string;
  component: string;

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
  }
}

export default Event;

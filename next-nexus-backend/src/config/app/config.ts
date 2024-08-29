type AppConfig = {
  api: {
    baseRoute: string;
    version: string;
  };
  docs: {
    swaggerUIPath: string;
    apiDocsPath: string;
  };
};

class appConfig {
  public api: AppConfig["api"];
  public docs: AppConfig["docs"];

  constructor() {
    this.api = {
      baseRoute: "api",
      version: "v1",
    };
    this.docs = {
      swaggerUIPath: "/v1/swagger",
      apiDocsPath: "/v1/api-docs",
    };
  }
}

const config = new appConfig();

export default config;

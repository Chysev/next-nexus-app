namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_BACKEND_BASE_URL: string;
    NEXT_PUBLIC_NEXUS_KEY: string;
  }
}

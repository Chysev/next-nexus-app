type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
};

type JwtOptions = {
  issuer?: string;
  audience?: string | string[];
  subject?: string;
  clockTolerance?: number;
};

type RateLimiterRule = {
  rate_limit: {
    time: number;
    limit: number;
  };
};

declare module "*.json" {
  const value: any;
  export default value;
}

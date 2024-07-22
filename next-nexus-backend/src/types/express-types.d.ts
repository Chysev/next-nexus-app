import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
  Router,
} from "express";

export type Request = ExpressRequest;
export type Response = ExpressResponse;
export type NextFunction = ExpressNextFunction;
export type ExpressRouter = Router;

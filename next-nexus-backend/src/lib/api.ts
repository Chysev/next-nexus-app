import { HttpStatusCode } from "axios";
import { Response } from "@/types/express-types";

abstract class Api {
  /**
   * Sends a JSON response to the client with the given data.
   *
   * @protected
   * @template T
   * @param {Response} res
   * @param {T} data
   * @param {HttpStatusCode} statusCode
   * @param {string} message
   * @returns {*}
   */
  protected send<T>(
    res: Response,
    data: T,
    statusCode: HttpStatusCode,
    message: string
  ) {
    return res.status(statusCode).json({ message, data });
  }
}

export default Api;

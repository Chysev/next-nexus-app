import { validate } from "class-validator";
import { HttpBadRequestError } from "@/lib/error";
import { Request, Response, NextFunction } from "@/types/express-types";
import { type ClassConstructor, plainToInstance } from "class-transformer";

class RequestValidator {
  static validate = <T>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const validationErrorText = "Request validation failed!";
      try {
        const convertedObject = plainToInstance(classInstance, req.body);
        const errors = await validate(
          convertedObject as Record<string, unknown>
        );
        if (errors.length === 0) {
          next();
          return;
        }
        const rawErrors: string[] = [
          ...new Set([
            ...errors.flatMap((error) =>
              Object.values(error.constraints ?? [])
            ),
          ]),
        ];

        next(new HttpBadRequestError(validationErrorText, rawErrors));
      } catch (e) {
        next(new HttpBadRequestError(validationErrorText, [e.message]));
      }
    };
  };
}

export default RequestValidator;

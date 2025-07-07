import { HttpError } from "./HttpError";

export abstract class AbstractService {
  protected throwIf(condition: boolean, status: number, message: string): void {
    if (condition) throw new HttpError(status, message);
  }
}
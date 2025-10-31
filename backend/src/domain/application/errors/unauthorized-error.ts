export class UnauthorizedError extends Error {
  constructor() {
    super("Only admin users can created an user");
  }
}

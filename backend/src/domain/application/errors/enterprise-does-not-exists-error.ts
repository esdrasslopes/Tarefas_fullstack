export class EnterpriseDoesNotExistsError extends Error {
  constructor() {
    super(`Enterprise does not exists `);
  }
}

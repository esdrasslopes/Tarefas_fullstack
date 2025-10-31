import { UniqueEntityID } from "./unique-entity-id";

export abstract class Entity<T> {
  private _id: UniqueEntityID;

  protected constructor(protected props: T, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID();
  }

  get id() {
    return this._id;
  }
}

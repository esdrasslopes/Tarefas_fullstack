import type { UsersRepository } from "@/domain/application/repositories/users-repository";
import { User } from "@/domain/entities/user";
import type { InMemoryEnterpriseRepository } from "./in-memory-enterprise-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  constructor(private enterpriseRepository: InMemoryEnterpriseRepository) {}

  async create(user: User) {
    const newUser = User.create({
      id: user.id ?? randomUUID(),
      email: user.email,
      entrepriseID: user.entrepriseID,
      name: user.name,
      password: user.password,
      role: user.role,
      userAccessID: user.userAccessID,
      userGroupId: user.userGroupId,
    });

    this.items.push(newUser);
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string) {
    const user = this.items.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async hasPermission(id: string) {
    const enterprise = await this.enterpriseRepository.findById(id);

    const user = await this.findById(id);

    if (enterprise || user?.role === "ADMIN") {
      return true;
    }

    return false;
  }
}

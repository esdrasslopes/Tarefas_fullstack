import type { User } from "@/domain/entities/user";

export interface UsersRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  hasPermission(id: string): Promise<boolean>;
}

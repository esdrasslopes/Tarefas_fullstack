import type { Optional } from "@/core/types/optional";
import type { User, UserProps } from "@/domain/entities/user";

export interface UsersRepository {
  create(user: Optional<UserProps, "id">): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  hasPermission(id: string): Promise<boolean>;
}

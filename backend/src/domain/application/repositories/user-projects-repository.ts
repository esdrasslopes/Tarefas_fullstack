import type { Optional } from "@/core/types/optional";
import type {
  UserProject,
  UserProjectProps,
} from "@/domain/entities/user-project";

export interface UserProjectsRepository {
  create(userProps: Optional<UserProjectProps, "id">): Promise<UserProject>;
}

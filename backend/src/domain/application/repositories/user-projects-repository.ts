import type {
  UserProject,
  UserProjectProps,
} from "@/domain/entities/user-project";

export interface UserProjectsRepository {
  create(userProps: UserProjectProps): Promise<UserProject>;
}

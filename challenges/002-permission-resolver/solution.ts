export type User = {
  id: number;
  name: string;
  roles: Role[];
};

export type Role = {
  name: string;
  description: string;
  permissions: Permission[];
};

export type Permission =
  "users:read" | "users:write" | "posts:read" | "posts:write" | "posts:delete";

export type EffectivePermissions = {
  userId: number;
  userName: string;
  permissions: Permission[];
};

export const getEffectivePermissions = (
  users: User[],
): EffectivePermissions[] => {
  // TODO: Implement
  throw new Error("Not implemented");
};

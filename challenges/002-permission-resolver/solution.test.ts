import { getEffectivePermissions, type User } from "./solution.js";

describe("getEffectivePermissions", () => {
  it("should return an empty array for empty input", () => {
    expect(getEffectivePermissions([])).toEqual([]);
  });

  it("should resolve permissions from a single role", () => {
    const users: User[] = [
      {
        id: 1,
        name: "Alice",
        roles: [
          {
            name: "viewer",
            description: "Read-only access",
            permissions: ["users:read", "posts:read"],
          },
        ],
      },
    ];

    expect(getEffectivePermissions(users)).toEqual([
      {
        userId: 1,
        userName: "Alice",
        permissions: ["users:read", "posts:read"],
      },
    ]);
  });

  it("should combine permissions from multiple roles", () => {
    const users: User[] = [
      {
        id: 1,
        name: "Alice",
        roles: [
          {
            name: "admin",
            description: "User administration",
            permissions: ["users:read", "users:write"],
          },
          {
            name: "editor",
            description: "Post editing",
            permissions: ["posts:read", "posts:write"],
          },
        ],
      },
    ];

    expect(getEffectivePermissions(users)).toEqual([
      {
        userId: 1,
        userName: "Alice",
        permissions: ["users:read", "users:write", "posts:read", "posts:write"],
      },
    ]);
  });

  it("should remove duplicate permissions", () => {
    const users: User[] = [
      {
        id: 1,
        name: "Alice",
        roles: [
          {
            name: "admin",
            description: "Full access",
            permissions: ["users:read", "users:write", "posts:read"],
          },
          {
            name: "editor",
            description: "Can edit posts",
            permissions: ["posts:read", "posts:write", "users:read"],
          },
        ],
      },
    ];

    expect(getEffectivePermissions(users)).toEqual([
      {
        userId: 1,
        userName: "Alice",
        permissions: ["users:read", "users:write", "posts:read", "posts:write"],
      },
    ]);
  });

  it("should preserve the order in which permissions are first encountered", () => {
    const users: User[] = [
      {
        id: 1,
        name: "Alice",
        roles: [
          {
            name: "editor",
            description: "Post editing",
            permissions: ["posts:write", "posts:read"],
          },
          {
            name: "admin",
            description: "User administration",
            permissions: ["users:write", "posts:read", "users:read"],
          },
        ],
      },
    ];

    expect(getEffectivePermissions(users)).toEqual([
      {
        userId: 1,
        userName: "Alice",
        permissions: ["posts:write", "posts:read", "users:write", "users:read"],
      },
    ]);
  });

  it("should return an empty permissions array for users with no roles", () => {
    const users: User[] = [
      {
        id: 1,
        name: "Alice",
        roles: [],
      },
    ];

    expect(getEffectivePermissions(users)).toEqual([
      {
        userId: 1,
        userName: "Alice",
        permissions: [],
      },
    ]);
  });

  it("should handle roles with no permissions", () => {
    const users: User[] = [
      {
        id: 1,
        name: "Alice",
        roles: [
          {
            name: "empty-role",
            description: "No permissions",
            permissions: [],
          },
        ],
      },
    ];

    expect(getEffectivePermissions(users)).toEqual([
      {
        userId: 1,
        userName: "Alice",
        permissions: [],
      },
    ]);
  });

  it("should remove duplicate permissions within the same role", () => {
    const users: User[] = [
      {
        id: 1,
        name: "Alice",
        roles: [
          {
            name: "admin",
            description: "Full access",
            permissions: ["users:read", "users:read", "posts:read"],
          },
        ],
      },
    ];

    expect(getEffectivePermissions(users)).toEqual([
      {
        userId: 1,
        userName: "Alice",
        permissions: ["users:read", "posts:read"],
      },
    ]);
  });

  it("should preserve the original user order", () => {
    const users: User[] = [
      {
        id: 3,
        name: "Charlie",
        roles: [],
      },
      {
        id: 1,
        name: "Alice",
        roles: [],
      },
      {
        id: 2,
        name: "Bob",
        roles: [],
      },
    ];

    expect(getEffectivePermissions(users)).toEqual([
      {
        userId: 3,
        userName: "Charlie",
        permissions: [],
      },
      {
        userId: 1,
        userName: "Alice",
        permissions: [],
      },
      {
        userId: 2,
        userName: "Bob",
        permissions: [],
      },
    ]);
  });

  it("should handle multiple users independently", () => {
    const users: User[] = [
      {
        id: 1,
        name: "Alice",
        roles: [
          {
            name: "admin",
            description: "Full access",
            permissions: ["users:read", "users:write", "posts:read"],
          },
        ],
      },
      {
        id: 2,
        name: "Bob",
        roles: [
          {
            name: "viewer",
            description: "Read-only access",
            permissions: ["users:read", "posts:read"],
          },
        ],
      },
    ];

    expect(getEffectivePermissions(users)).toEqual([
      {
        userId: 1,
        userName: "Alice",
        permissions: ["users:read", "users:write", "posts:read"],
      },
      {
        userId: 2,
        userName: "Bob",
        permissions: ["users:read", "posts:read"],
      },
    ]);
  });

  it("should not mutate the input users", () => {
    const users: User[] = [
      {
        id: 1,
        name: "Alice",
        roles: [
          {
            name: "admin",
            description: "Full access",
            permissions: ["users:read", "posts:read"],
          },
        ],
      },
    ];

    const originalUsers = users.map((user) => ({ ...user }));

    getEffectivePermissions(users);

    expect(users).toEqual(originalUsers);
  });
});

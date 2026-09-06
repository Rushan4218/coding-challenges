# Challenge 002 — Permission Resolver

## Problem

You are given a list of users. Each user can have multiple roles, and each role grants one or more permissions.

Your task is to generate the **effective permissions** for every user.

A user's effective permissions are all permissions granted by their roles, with duplicate permissions removed.

## Input

```ts
type User = {
  id: number;
  name: string;
  roles: Role[];
};

type Role = {
  name: string;
  description: string;
  permissions: Permission[];
};

type Permission =
  "users:read" | "users:write" | "posts:read" | "posts:write" | "posts:delete";
```

## Function

Implement:

```ts
const getEffectivePermissions = (users: User[]): EffectivePermissions[] => {
  // ...
};
```

The return type is:

```ts
type EffectivePermissions = {
  userId: number;
  userName: string;
  permissions: Permission[];
};
```

## Requirements

Your implementation must:

1. Return one result for every user.
2. Collect permissions from all of the user's roles.
3. Remove duplicate permissions.
4. Preserve the order in which permissions are first encountered.
5. Return an empty `permissions` array for users with no roles.
6. Preserve the original order of users.
7. Not mutate the input users, roles, or permissions.
8. Work with any number of users and roles.

## Permission Order

The order of permissions matters.

For example, if a user's roles contain:

```ts
Role A:
[
  "users:read",
  "posts:read",
]

Role B:
[
  "posts:read",
  "posts:write",
]

Role C:
[
  "users:write",
]
```

The result must contain:

```ts
["users:read", "posts:read", "posts:write", "users:write"];
```

`"posts:read"` appears only once because it was already encountered in Role A.

## Example

### Input

```ts
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
        permissions: ["posts:read", "posts:write"],
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
```

### Expected Output

```ts
[
  {
    userId: 1,
    userName: "Alice",
    permissions: ["users:read", "users:write", "posts:read", "posts:write"],
  },
  {
    userId: 2,
    userName: "Bob",
    permissions: ["users:read", "posts:read"],
  },
];
```

## Edge Cases

Your implementation should correctly handle:

- An empty users array.
- A user with no roles.
- A role with no permissions.
- Multiple roles granting the same permission.
- Duplicate permissions within a role.
- Multiple users with different roles.
- Users appearing in any order.

## Constraints

- Do not modify the input data.
- Do not assume a fixed number of users or roles.
- Do not assume permissions are unique across roles.
- The solution should work efficiently with large inputs.

## What This Tests

This challenge focuses on practical data transformation rather than a traditional algorithm puzzle.

You will need to work with:

- Nested arrays
- Object transformation
- Array traversal
- Deduplication
- Preserving insertion order
- Immutable data handling
- Combining data from multiple sources

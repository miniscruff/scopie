---
hide:
  - navigation
---

# Scopie

Authorization engine providing fine grained access while you control the data.
Aimed at being easy to use and implement without overtaking other parts of your system.

## Database Quick Start
Given a users table for a blogging app with some users.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  scopes TEXT
  -- other fields
);

INSERT INTO users (id, username, scopes) VALUES (
  1, 'elsa', 'blog/post/create'
);

INSERT INTO users (id, username, scopes) VALUES (
  2, 'belle', 'blog/post/read'
);
```

Now when you a user goes to create a post.
We can check if they have the `blog/post/create` scope.

```py
def create_post(self, user_id: int, body str):
    user := get_user(user_id)
    auth_vars = {
        "user_id"
        "user_name": user.username,
    }

    if not is_authorized(auth_vars, "blog/post/create", user.scopes):
        return

    create_post(user, body)

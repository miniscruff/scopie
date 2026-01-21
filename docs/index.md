---
hide:
  - navigation
---

# Scopie

Authorization engine for configuring per user per feature access control.
Access is configured via plain text and handled directly via code.
Configuration storage is controlled by you, scopie just handles the logic.

## Example

A portion of our application is around building, running and responding to financial reports.
We run half, quarterly, monthly and weekly reports.

**Actions**

1. Edit: Modify how the report is built
2. Run: Manually run the report
3. Read: Read the reports in our tool
4. Approve: Sign off on the report, approved reports would then be shared
5. Delete: Remove an invalid or broken report

**Format**

For the above reasons we are going to specify our permissions and actions as:
```
reports/<duration>/<action>
```

We could expand this later to include some sort of organization or business
group but for this example, we will keep it simple.

**Users**

1. Maya is allowed to do everything ( the boss )
```
allow/**
```
2. Adam is allowed to edit and read any report ( makes changes to the queries )
```
allow/reports/*/edit|read
```
3. Tyler can only read reports ( reviews reports but doesn't need to approve them )
```
allow/reports/*/read
```
4. Elisa can do everything but delete ( mostly there to approve, but occasionally edits queries )
```
allow/reports/*/*
deny/reports/*/delete
```
5. Jenna can edit and read but only the weekly reports ( a new hire working up )
```
allow/reports/weekly/edit|read
```

## Quick Intro
See [implementations](./implementations.md) for more complete guides per language.

=== "Javascript"

    ```js
    import { isAllowed } from "scopie";

    const users = {
        elsa: {
            actions: ["allow/blog/create|update"],
        },
        bella: {
            actions: ["allow/blog/create"],
        },
    ]
    const blogPosts = {}

    function createBlog(username, blogSlug, blogContent) {
        const user = users[username]
        if (isAllowed(["blog/create"], user.actions)) {
            blogPosts[blogSlug] = {
                author: user,
                content: blogContent,
            }
        }
    }

    function updateBlog(username, blogSlug, blogContent) {
        const user = users[username]
        if (isAllowed(["blog/update"], user.actions)) {
            blogPosts[blogSlug] = {
                author: user,
                content: blogContent,
            }
        }
    }
    ```

=== "Typescript"

    ```ts
    import { isAllowed } from "scopie";

    type User = {
        actions: Array<string>;
    };

    type BlogPost = {
        author: User;
        content: string;
    }

    type UserStore = {
        [key: string]: User
    }

    type BlogStore = {
        [key: string]: BlogPost
    }

    const users: UserStore = {
        elsa: {
            actions: ["allow/blog/create|update"],
        },
        bella: {
            actions: ["allow/blog/create"],
        },
    }

    const blogPosts: BlogStore = {}

    function createBlog(username: string, blogSlug: string, blogContent: string) {
        const user = users[username]
        if (isAllowed(["blog/create"], user.actions)) {
            blogPosts[blogSlug] = {
                author: user,
                content: blogContent,
            }
        }
    }

    function updateBlog(username: string, blogSlug: string, blogContent: string) {
        const user = users[username]
        if (isAllowed(["blog/update"], user.actions)) {
            blogPosts[blogSlug] = {
                author: user,
                content: blogContent,
            }
        }
    }
    ```

=== "Go"

    ```go
    import (
        "errors"
        "github.com/miniscruff/scopie-go"
    )

    type User struct {
        Actions []string
    }

    type BlogPost struct {
        Author  User
        Content string
    }

    var userStore map[string]User = map[string]User{
        "elsa": User{
            Actions: []string{"allow/blog/create|update"},
        },
        "belle": User{
            Actions: []string{"allow/blog/create"},
        },
    }
    var blogStore map[string]BlogPost = map[string]BlogPost{}

    func createBlog(username, blogSlug, blogContent string) error {
        user := users[username]
        allowed, err := scopie.IsAllowed([]string{"blog/create"}, user.Actions, nil)
        if err != nil {
            return err
        }

        if !allowed {
            return errors.New("not allowed to create a blog post")
        }

        blogStore[blogSlug] = BlogPost{
            Author: user,
            Content: blogContent,
        }
        return nil
    }

    func updateBlog(username, blogSlug, blogContent string) error {
        user := users[username]
        allowed, err := scopie.IsAllowed([]string{"blog/update"}, user.Actions, nil) {
        if err != nil {
            return err
        }

        if !allowed {
            return errors.New("not allowed to update this blog post")
        }

        blogPosts[blogSlug] = BlogPost{
            author: user,
            content: blogContent,
        }
        return nil
    }
    ```

=== "Python"

    ```python
    from scopie import is_allowed

    users = {
        "elsa": {
            "actions": ["allow/blog/create|update"],
        },
        "bella": {
            "actions": ["allow/blog/create"],
        },
    }

    blogPosts = {}

    def create_blog(username, blogSlug, blogContent):
        user = users[username]
        if is_allowed(["blog/create"], user["actions"]):
            blogPosts[blogSlug] = {
                "author": user,
                "content": blogContent,
            }

    def update_blog(username, blogSlug, blogContent):
        user = users[username]
        if is_allowed(["blog/update"], user["actions"]):
            blogPosts[blogSlug] = {
                "author": user,
                "content": blogContent,
            }
    ```

---
hide:
  - navigation
---

# Scopie

Authorization engine providing fine grained access while you control the data.
Aimed at being easy to use and implement without overtaking other parts of your system.

## Quick Intro
See [implementations](./implementations.md) for more complete guides per language.

=== "Javascript"

    ```js
    import { isAllowed } from "scopie";

    const users = {
        elsa: {
            scopes: ["allow/blog/create|update"],
        },
        bella: {
            scopes: ["allow/blog/create"],
        },
    ]
    const blogPosts = {}

    function createBlog(username, blogSlug, blogContent) {
        const user = users[username]
        if (isAllowed(user.scopes, ["blog/create"])) {
            blogPosts[blogSlug] = {
                author: user,
                content: blogContent,
            }
        }
    }

    function updateBlog(username, blogSlug, blogContent) {
        const user = users[username]
        if (isAllowed(user.scopes, ["blog/update"])) {
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
        scopes: Array<string>;
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
            scopes: ["allow/blog/create|update"],
        },
        bella: {
            scopes: ["allow/blog/create"],
        },
    }

    const blogPosts: BlogStore = {}

    function createBlog(username: string, blogSlug: string, blogContent: string) {
        const user = users[username]
        if (isAllowed(user.scopes, ["blog/create"])) {
            blogPosts[blogSlug] = {
                author: user,
                content: blogContent,
            }
        }
    }

    function updateBlog(username: string, blogSlug: string, blogContent: string) {
        const user = users[username]
        if (isAllowed(user.scopes, ["blog/update"])) {
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
        Scopes []string
    }

    type BlogPost struct {
        Author  User
        Content string
    }

    var userStore map[string]User = map[string]User{
        "elsa": User{
            Scopes: []string{"allow/blog/create|update"},
        },
        "belle": User{
            Scopes: []string{"allow/blog/create"},
        },
    }
    var blogStore map[string]BlogPost = map[string]BlogPost{}

    func createBlog(username, blogSlug, blogContent string) error {
        user := users[username]
        allowed, err := scopie.IsAllowed([]string{"blog/create"}, user.scopes, nil)
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
        allowed, err := scopie.IsAllowed([]string{"blog/update"}, user.scopes, nil) {
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


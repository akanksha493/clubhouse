# Clubhouse

This is a members-only clubHouse, where only members can see post and the author of post and rest will only be able see post and "anonymous" in place of author.

Built using NodeJS and Express, authentication is done using local strategy of passport.js.

### How it works
Rules are simple.
- Everyone can see post 
- a users(authenticated) can create post, but if not a member, they cannot see author of post
- a club member (one who has membership) can see authors of post, create post
- a admin can delete a post, see author and create a post

NOTE: a user is not a member by default but they can request membership using secret code.

> secret-code: secret05

admin access cannot be granted so login using a user who is already a admin. Admin credential are:
>username: dm@gmail.com <br>
>password: dm12



Live Site - [Live Preview](https://clubhouse-p19r.onrender.com/)

Built as a part of [Odin Project Curriculum](https://www.theodinproject.com/lessons/nodejs-members-only)
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, caching behavior, routing, and file structure may all differ from your training data.

Before writing or changing any Next.js code:
- Check the installed Next.js version in `package.json`.
- Read the relevant guide in `node_modules/next/dist/docs/`.
- Follow the docs for this exact installed version.
- Heed deprecation notices.
- Do not rely only on training data for Next.js APIs.
<!-- END:nextjs-agent-rules -->

# Project conventions

- Use TypeScript-safe code.
- Prefer Server Components by default.
- Use Client Components only when hooks, browser APIs, or interactivity are needed.
- Follow the existing project structure.
- Do not introduce new libraries unless necessary.
# Migrating kitchensink to RedwoodSDK 1.0

## Problem

The `kitchensink_1-beta` project is using an older version of RedwoodSDK (`0.x`) and needs to be updated to version `1.x`. This requires following a migration guide to address breaking changes.

## Plan

1.  Update `package.json` dependencies. This includes adding explicit dependencies for `react`, `wrangler`, and Cloudflare types, which were previously transitive. I also need to update `@rwsdk/adapter-cloudflare` to a `1.x` version.
2.  Update `wrangler.jsonc` to set a newer `compatibility_date`.
3.  Review and update middleware to account for RSC actions now running through the middleware pipeline. The `isAction` flag will be used to conditionally apply logic.
4.  Update response header usage from `requestInfo.headers` to `requestInfo.response.headers`.
5.  Remove the `resolveSSRValue` wrapper, as it's been removed in `1.x`.

## Context

The migration is guided by the `migrating.mdx` document. The optional migration to the passkey addon will be skipped as the guide recommends this for projects not in production with existing user data, due to the complexity of migrating from D1/Prisma to a SQLite-based Durable Object. The existing authentication implementation is expected to work.

---

## Implementation

- **Dependencies**: Updated `package.json` to include `react`, `react-dom`, and `react-server-dom-webpack` as direct dependencies, as they are now peer dependencies of `rwsdk`. Updated `rwsdk` to `1.0.0-beta.9`. Also updated `wrangler`, `@cloudflare/vite-plugin`, and added `@cloudflare/workers-types` to their latest versions. Removed `pnpm-lock.yaml` and ran `pnpm install` to apply the changes, adhering to the project's preference to avoid lockfiles.

- **Configuration**: Updated `wrangler.jsonc` to set the `compatibility_date` to `2025-08-21`.

- **Middleware**: Reviewed the middleware in `src/worker.tsx`. The existing middleware for database setup is simple and does not require changes to handle the `isAction` flag, as it should run on all requests.

- **Headers**: Refactored `src/app/headers.ts` to use `response.headers.set` instead of the now-removed `headers.set` from the middleware context.

- **`resolveSSRValue`**: A search confirmed that the deprecated `resolveSSRValue` function was not in use, so no changes were needed.

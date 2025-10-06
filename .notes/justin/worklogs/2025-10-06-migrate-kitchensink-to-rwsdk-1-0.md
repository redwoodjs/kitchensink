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

---

## Real-time feature debugging

### Problem

After migrating the kitchensink app to `rwsdk` v1.0, the real-time features, specifically the reaction page example, have stopped working. Client-side navigation appears to be unaffected.

### Plan

1.  **Examine the existing implementation**: Review the code for the reaction page, including the durable object and client-side components, to understand how it's supposed to work.
2.  **Investigate SDK changes**: Look for any changes in the `rwsdk` real-time API that might not have been covered in the migration guide.
3.  **Debug**: Trace the communication between the client and the `RealtimeDurableObject` to pinpoint the failure.
4.  **Implement a fix**: Apply the necessary changes to get the real-time functionality working again.

---

### Findings & Solution

The investigation revealed that the `addReaction` server action was correctly updating the in-memory `REACTIONS` array, but it was not broadcasting the change to connected clients. The `renderRealtimeClients` function, which is responsible for triggering updates, was only being called by the `resetActions` function.

The likely cause is a change in the `rwsdk`'s real-time API between `0.x` and `1.x`. The newer version appears to require an explicit call to `renderRealtimeClients` to push state changes, whereas the previous version might have handled this automatically.

The fix was to update the `addReaction` function in `src/app/pages/Reaction/functions.ts` to be `async` and to call `await renderRealtimeClients(...)` after modifying the `REACTIONS` array. This ensures that every new reaction is broadcast to all clients in real-time.

### Plan

1.  Refactor `src/client.tsx` to remove static imports.
2.  Implement logic to check `localStorage` for `navigationMode` and `networkTransport`.
3.  Use `await import(...)` to dynamically load the required modules inside an async IIFE.
4.  Ensure that only the necessary modules are loaded for each of the four possible combinations of settings (server/client navigation, fetch/realtime transport).

---

### Implementation

The `src/client.tsx` file was refactored to use an async IIFE. Inside this function, `localStorage` is checked to determine the `navigationMode` and `networkTransport`. Based on these values, `import()` is used to load the appropriate modules from `rwsdk` on demand. This prevents loading unnecessary code, such as the client-side navigation module when in server navigation mode, or the realtime client when using the fetch transport. I also noticed that the `key` property was being passed to `initRealtimeClient`, but it is not a valid property, so I removed it.

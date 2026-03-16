import type { AuthObject } from "@clerk/backend";
import { PendingSessionOptions } from "@clerk/express/dist/types";

declare global {
    namespace Express {
        interface Request {
            auth: AuthObject & {
                (options?: PendingSessionOptions): AuthObject;
            };
            session: PendingSessionOptions | null;
        }
    }
}
// This file is use to fix error "!req.auth()" in authentication middleware.
// That error happens because the clerk middleware adds the auth method to the request object, but TypeScript doesn't know about it. By declaring a global augmentation for the Express Request interface, we can tell TypeScript that the auth method exists and what its type is.
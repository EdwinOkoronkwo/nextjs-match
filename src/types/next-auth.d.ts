// types/next-auth.d.ts

import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            profileComplete: boolean;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        profileComplete: boolean;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        profileComplete: boolean;
    }
}

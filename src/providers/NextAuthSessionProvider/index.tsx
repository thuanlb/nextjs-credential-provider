"use client";

import { SessionProvider } from "next-auth/react";
import React, { type ReactNode } from "react";

interface Props {
    children: ReactNode;
}

function NextAuthSessionProvider({ children }: Props) {
    return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthSessionProvider;
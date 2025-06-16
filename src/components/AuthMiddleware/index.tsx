"use client";

import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useCallback, useEffect, useMemo } from "react";

import { useSession } from "../../providers/SessionProvider";
import webRoutes from "@/routes/web";

// Định nghĩa các vai trò admin
const ADMIN_ROLES = ["admin", "super_admin"];

type Props = React.PropsWithChildren;

function AuthMiddleware({ children }: Props) {
    const { session } = useSession();
    const router = useRouter();
    const isAuthenticated = !!session;
    const pathname = usePathname();
    const isAdmin =
        session?.user.roleCode && ADMIN_ROLES.includes(session.user.roleCode);

    const authPaths = useMemo(() => {
        return Object.values(webRoutes.auth);
    }, []);

    const redirectToLogin = useCallback(() => {
        router.push(webRoutes.auth.login);
    }, [router]);

    const redirectDashboardPage = useCallback(() => {
        router.push(webRoutes.dashboard);
    }, [router]);

    const shouldRedirectToDashboard =
        authPaths.includes(pathname) && // Current path is auth path
        isAuthenticated && // And is authenticated
        isAdmin; // And is admin

    const shouldRedirectToLogin =
        !authPaths.includes(pathname) && // Current path is main path
        (!isAuthenticated || !isAdmin); // And unauthenticated or isn't admin

    useEffect(() => {
        if (shouldRedirectToDashboard) {
            redirectDashboardPage();
            return;
        }

        if (shouldRedirectToLogin) {
            redirectToLogin();
        }
    }, [
        redirectDashboardPage,
        redirectToLogin,
        shouldRedirectToDashboard,
        shouldRedirectToLogin,
    ]);

    return children;
}

export default AuthMiddleware;
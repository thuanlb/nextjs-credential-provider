"use client";

import { type Session } from "next-auth";
import {
    signOut as nextAuthSignOut,
    useSession as useSessionNextAuth,
} from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

import webRoutes from "@/routes/web";

interface IAuthContext {
    session: Session | null;
    signOut: () => Promise<unknown>;
}

interface IProps extends React.PropsWithChildren {
    session: Session | null;
}

const AuthContext = createContext<IAuthContext>({
    session: null,
    signOut: async () => {},
});

export const useSession = () => useContext(AuthContext);

function SessionProvider({ children, session }: IProps) {
    const [sessionState, setSessionState] = useState<Session | null>(session);

    const router = useRouter();

    const { update: updateSession } = useSessionNextAuth();

    const signOut = useCallback(async () => {
        return await new Promise((resolve, reject) => {
            void nextAuthSignOut({ redirect: false })
                .then(() => {
                    setSessionState(null);
                    router.push(webRoutes.auth.login);
                })
                .then(resolve)
                .catch(reject);
        });
    }, [router]);

    const update = useCallback(
        async (session: Session) => {
            await updateSession(session);
            setSessionState(session);
        },
        [updateSession],
    );

    const value = useMemo(() => {
        return {
            session: sessionState,
            signOut,
        };
    }, [sessionState, signOut]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
export default SessionProvider;
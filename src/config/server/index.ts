import type { SessionStrategy } from "next-auth";

const serverConfig = {
    app: {
        url: process.env.APP_DOMAIN,
    },
    api: {
        baseUrl: process.env.API_BASE_URL,
        tokenSuperAdmin: process.env.API_TOKEN_SUPER_ADMIN,
    },
    jwt: {
        strategy: "jwt" as SessionStrategy,
        secret: process.env.NEXTAUTH_SECRET,
    },
    rocketChat: {
        url: process.env.NEXT_PUBLIC_ROCKET_CHAT_URL as string,
        password: process.env.ROCKET_CHAT_PASSWORD as string,
        allowDomains: (process.env.ROCKET_CHAT_ALLOW_DOMAINS ?? "").split(","),
    },
    google: {
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    },
    solr: {
        baseUrl: process.env.SOLR_BASE_URL as string,
        username: process.env.SOLR_USERNAME as string,
        password: process.env.SOLR_PASSWORD as string,
    },
};

export default serverConfig;
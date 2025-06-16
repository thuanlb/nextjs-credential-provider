import qs from "qs";

import serverConfig from "@/config/server";
import { type ISearchParams } from "@/interface";

const apiRoutes: any = {
    user: {
        getMe: (params?: ISearchParams) =>
            `/api/users/me?${qs.stringify(params)}`,
    },
    auth: {
        login: () => "/api/auth/local",
        forgotPassword: () => "/api/resource/auth/forgot-password",
        resetPassword: () => "/api/resource/auth/reset-password",
    },
};

export default apiRoutes;
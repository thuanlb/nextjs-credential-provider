import apiServer from "@/api/server";
import apiRoutes from "@/routes/api";
import { getTokenSuperAdmin } from "@/utils/api";

const signIn = async (credentials: {
    identifier: string;
    password: string;
}) => {
    const { data: loginData, error: loginError } = await apiServer(
        apiRoutes.auth.login(),
        {
            method: "POST",
            body: JSON.stringify({
                identifier: credentials.identifier,
                password: credentials.password,
            }),
            headers: {
                "Content-type": "Application/json",
                Authorization: getTokenSuperAdmin(),
            },
        },
    );

    if (loginError) {
        throw loginError;
    }

    const { data: userData, error: userError } = await apiServer(
        apiRoutes.user.getMe({ populate: { role: "*" } }),
        {
            method: "GET",
            headers: {
                "Content-type": "Application/json",
                Authorization: `Bearer ${loginData.jwt}`,
            },
        },
    );

    if (userError) {
        throw userError;
    }

    return {
        loginData,
        userData,
    };
};

export default signIn;
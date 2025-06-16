import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import config from "@/config/server";
import { type IHttpResponse } from "@/interface/api";
import authOptions from "@/lib/authOptions";

const getBody = async (request: Request) => {
    let json = null;
    let formData = null;

    try {
        formData = await request.formData();
    } catch (err) {
        //
    }

    try {
        json = await request.json();
    } catch (err) {
        //
    }

    return json || formData;
};

const isFormData = (body: unknown) => body instanceof FormData;

export const buildConfig = async (
    request: Request,
    { useTokenSuperAdmin = false } = {},
): Promise<RequestInit> => {
    const body = await getBody(request);

    const config: RequestInit = {};

    config.headers = {
        Authorization: useTokenSuperAdmin
            ? getTokenSuperAdmin()
            : await getAuthToken(),
    };
    if (body) {
        if (isFormData(body)) {
            config.body = body;
        } else {
            config.body = JSON.stringify(body);
            config.headers = {
                "Content-Type": "Application/json",
                ...config.headers,
            };
        }
    }

    return config;
};

export const getTokenSuperAdmin = () => `Bearer ${config.api.tokenSuperAdmin}`;

export const getAuthToken = async () => {
    const session = await getServerSession(authOptions);

    return `Bearer ${session?.user.jwt}`;
};

export const response = (response: IHttpResponse) => {
    return NextResponse.json(response.data ?? response.error, {
        status: response.status,
        statusText: response.statusText,
    });
};
import config from "@/config/server";
import { type IHttpResponse } from "@/interface/api";

const apiServer = async (
    url: string,
    requestInit?: RequestInit,
): Promise<IHttpResponse> => {
    let _url = "";
    if (url.startsWith("http")) {
        _url = url;
    } else {
        _url = `${config.api.baseUrl}${url}`;
    }
    const res = await fetch(_url, requestInit);

    if (res.ok) {
        return {
            data: await res.json(),
            error: null,
            status: res.status,
            statusText: res.statusText,
        };
    }

    return {
        data: null,
        error: await res.json(),
        status: res.status,
        statusText: res.statusText,
    };
};

export default apiServer;
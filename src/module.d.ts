import { AxiosResponse } from 'axios';

declare module 'lixqajsapi' {
    interface ApiParameters {
        url: string;
        method?: string;
        headers?: Record<string, string>;
        body?: object;
        proxy?: string | null;
    }

    interface ApiOptions {
        showOutput?: boolean;
        showError?: boolean;
        showDetailedError?: boolean;
    }

    interface ApiResponse extends AxiosResponse {
        reqDuration: number;
    }

    function sendApi(parameters: ApiParameters, options?: ApiOptions): Promise<any>;

    enum ApiRequestMethod {
        GET = "GET",
        POST = "POST",
        DELETE = "DELETE",
        PUT = "PUT"
    }

    export {
        sendApi,
        ApiRequestMethod
    };
}
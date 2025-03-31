"use server";

import axios from "axios";

const baseURL = "https://zingcam.prod.flamapp.com/campaign-svc";

export const zingcam = axios.create({
    baseURL,
});

async function handleAPIV2(recdConfig: any) {
    // const session = await getServerSession(authOptions);

    const config: any = recdConfig;

    try {
        // config.headers.common["Content-Type"] = "application/json";
        // config.headers.common.Authorization = `Bearer ${session?.user?.token as string}`;
        return config;
    } catch (err) {
        return config;
    }
}

zingcam.interceptors.request.use(
    async (recdConfig: any) => {
        return handleAPIV2(recdConfig);
    },
    (error: Error) => Promise.reject(error)
);

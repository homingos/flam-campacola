"use server";

import { zingcam } from "./zingcam";

export const getSearchUrl = async (short_code: string) => {
    try {
        const res = await zingcam.get(
            `/api/v1/campaigns/${short_code}/experiences`,
            {
                headers: {
                    // cache: "no-store",
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await res.data;
        return data;
    } catch (err: any) {
        return {
            err,
        };
    }
};
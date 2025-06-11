import type { ReqResResponse } from "~/types/client";
import { FetchError } from "ofetch";

export default defineEventHandler(async () => {
    const config = useRuntimeConfig();

    const API_URL = 'https://reqres.in/api/users';

    try {
        const res = await $fetch<ReqResResponse>(API_URL, {
            headers: {
                'x-api-key': config.REQRES_API_KEY,
            },

            timeout: 5000,
        });

        return res.data;
    } catch (error) {
        if (error instanceof FetchError) {
            throw createError({
                statusCode: error.statusCode || 500,
                statusMessage: 'Failed to fetch clients data',
                data: { message: error.message }
            });
        }

        console.error('Unexpected error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
})

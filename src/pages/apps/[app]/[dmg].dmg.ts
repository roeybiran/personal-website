export const prerender = false;

import type { APIRoute } from 'astro';
import { getBinaryFile } from '../../../utils/s3';

export const GET: APIRoute = async ({ params }) => {
    try {
        const { app, dmg } = params;
        
        if (!app || !dmg) {
            throw new Error('App slug and DMG filename are required');
        }

        return await getBinaryFile(app, `${dmg}.dmg`);
    } catch (error) {
        return new Response(null, {
            status: 404,
            headers: {
                'Location': '/404'
            }
        });
    }
}

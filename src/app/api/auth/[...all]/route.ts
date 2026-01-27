import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

const allowedOrigin = process.env.NODE_ENV === 'production'
	? 'https://saas-forge-kit.vercel.app'
	: 'http://localhost:3000';

function withCORS(
	handler: (req: Request, ...args: unknown[]) => Promise<Response>
): (req: Request, ...args: unknown[]) => Promise<Response> {
	return async (req, ...args) => {
		// Handle preflight
		if (req.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					'Access-Control-Allow-Origin': allowedOrigin,
					'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type,Authorization',
					'Access-Control-Allow-Credentials': 'true',
				},
			});
		}
		const res = await handler(req, ...args);
		// Clone and add CORS headers
		const headers = new Headers(res.headers);
		headers.set('Access-Control-Allow-Origin', allowedOrigin);
		headers.set('Access-Control-Allow-Credentials', 'true');
		return new Response(res.body, {
			status: res.status,
			statusText: res.statusText,
			headers,
		});
	};
}

const { GET: rawGET, POST: rawPOST } = toNextJsHandler(auth);
export const GET = withCORS(rawGET);
export const POST = withCORS(rawPOST);

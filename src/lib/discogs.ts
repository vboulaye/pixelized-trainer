import disconnect from 'disconnect';
import { PUBLIC_DISCOGS_URL } from '$env/static/public';

const { Client } = disconnect;

export const DiscogsClient = Client;

export interface RequestTokenResponse {
	authorizeUrl: string;
};


export function getAccessToken() {
	const item = localStorage.getItem('accessToken');
	if (!item) {
		return null;
	}
	return JSON.parse(item);
}


function buildAuthorizationHeader(method: 'GET' | 'POST', url: string) {
	const accessToken = getAccessToken();
	if (!accessToken) {
		throw new Error('No access token');
	}
	const dis = new DiscogsClient(accessToken);
	const authorization = dis.oauth().toHeader(method, url);
	return authorization;
}

export async function callDiscogs(options: {
	method?: 'GET' | 'POST';
	path: string;
	body?: unknown;
	fetch: (input: (RequestInfo | URL), init?: RequestInit) => Promise<Response>;

}) {
	const fetchMethod = options.fetch ?? fetch;
	const url = PUBLIC_DISCOGS_URL + options.path;
	const method = options.method ?? 'GET';
	return await fetchMethod(url, {
		method: method,
		headers: {
			Authorization: buildAuthorizationHeader(method, url)
		}
	}).then(res => res.json());

}

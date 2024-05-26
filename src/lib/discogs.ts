import disconnect from 'disconnect';
import { PUBLIC_DISCOGS_URL } from '$env/static/public';

const { Client } = disconnect;

export const DiscogsClient = Client;


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

}) {

	const url = PUBLIC_DISCOGS_URL + options.path;
	const method = options.method ?? 'GET';
	return await fetch(url, {
		method: method,
		headers: {
			Authorization: buildAuthorizationHeader(method, url)
		}
	}).then(res => res.json());

}

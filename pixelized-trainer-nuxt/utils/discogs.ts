import disconnect from 'disconnect';

const { Client } = disconnect;

export const DiscogsClient = Client;

export interface RequestTokenResponse {
	authorizeUrl: string;
}

export interface DiscogsIdentity {
	id:string;
	username:string;
}

export function getAccessToken() {
	const cookieRef = useCookie('accessToken');
	// console.log({ cookieRef });
	const item = cookieRef.value;
	// console.log('item=' + JSON.stringify(item));
	// const item = localStorage.getItem('accessToken');
	return item;
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

export async function callDiscogs<T>(options: {
	method?: 'GET' | 'POST';
	path: string;
	body?: unknown;

}):Promise<T> {

	const appConfig = useAppConfig();

	const url = appConfig.discogs.url + options.path;
	console.log('url=' + options.path);
	const method = options.method ?? 'GET';
	const newVar = await $fetch(url, {
		method: method,
		headers: {
			Authorization: buildAuthorizationHeader(method, url)
		}
	});
	return newVar as T

}

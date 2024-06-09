export default defineNuxtRouteMiddleware((to, from) => {
	if (to.path.startsWith('/discogs') && !getAccessToken()) {
		return abortNavigation('discogs login is required to access this page');
	}
});
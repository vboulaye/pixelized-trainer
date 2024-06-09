import { callDiscogs } from '$lib/discogs';
import { randomize } from '$lib';


function cleanupRelease(release) {
	const { id, master_id, cover_image, title, year, artists } = release.basic_information;
	return {
		id, master_id, cover_image, title, year,
		artists: artists.map(({ name, id }) => ({ name, id }))
	};
}

function cleanReleaseResults(result) {
	const { page, pages, per_page, items } = result.pagination;
	const filteredReleases = {
		pagination: { page, pages, per_page, items },
		releases: result.releases.map((release) => {
			return cleanupRelease(release);
		})
	};
	return filteredReleases;
}

export async function load({ parent, fetch,depends }) {
	depends('app:random');

	const data = await parent();
	const folderId = 0;
	const perPage = 5;

	const result1 = await callDiscogs({
		path: `/users/${data.identity.username}/collection/folders/${folderId}/releases?per_page=${perPage}`,
		fetch
	});
	const wishedItem = randomize(result1.pagination.items);
	const wishedPage =  Math.trunc(wishedItem / perPage);
	const wishedItemInPage = wishedItem % perPage;

	// console.log({ wishedItemInPage, wishedPage });

	const result = await callDiscogs({
		path: `/users/${data.identity.username}/collection/folders/${folderId}/releases?per_page=${perPage}&page=${wishedPage}`,
		fetch
	});
	// console.log({ result });
	const release = result.releases[wishedItemInPage];
	// console.log({ release });
	const wishedRelease = cleanupRelease(release);
	return { ...data, wishedRelease };
}
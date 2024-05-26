import { callDiscogs,   } from '$lib/discogs';





export async function load({ parent, url,fetch }) {
	const data = await parent();
	let searchCriteria = '';
	for (const entry of url.searchParams.entries()) {
		if (['query', 'artist'].includes(entry[0])) {
			searchCriteria += '&' + entry[0] + '=' + entry[1];
		}
	}
	const result = await callDiscogs({ path: `/database/search?type=master${searchCriteria}` ,fetch});

	return { ...data, results: result  };
}


function cleanReleaseResults(result) {
	const { page, pages, per_page, items } = result.pagination;
	const filteredReleases = {
		pagination: { page, pages, per_page, items },
		releases: result.results
			.filter(result => result.type==="release")
			.map((result) => {
			const { id, master_id, cover_image, title, year, artists } = result;
			return { id, master_id, cover_image, title, year, artists: artists.map(({ name }) => name) };
		})
	};
	return filteredReleases;
}

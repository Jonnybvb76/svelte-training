import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import steps from '$lib/steps.json';

export const load: PageLoad = ({ params }) => {
	const step = steps.find((step) =>
		step.title.replace(/ /g, "-") === params.slug.replace(/ /g, "-")
	);

	if (!step) throw error(404, 'Not found');

	return { data: step.steps };
};
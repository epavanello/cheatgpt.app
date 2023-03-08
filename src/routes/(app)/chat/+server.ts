import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { Configuration, OpenAIApi } from 'openai';
import { PRIVATE_OPENAI_API_KEY } from '$env/static/private';

const configuration = new Configuration({
	apiKey: PRIVATE_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { message } = await request.json();
		const completion = await openai.createChatCompletion({
			messages: [
				{
					role: 'system',
					content:
						'Answer succinctly and directly, do not provide explanations or elaborations, simply state the direct response to the question asked'
				},
				{ role: 'user', content: message }
			],
			model: 'gpt-3.5-turbo'
		});

		return json({ response: completion.data.choices[0].message });
	} catch (error: any) {
		if (error.response) {
			console.error(error, { status: error.response.status, data: error.response.data });
		} else {
			console.error(error, error.message);
		}
		throw error(500, 'internal error');
	}
};

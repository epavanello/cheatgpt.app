import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { Configuration, OpenAIApi, type ChatCompletionRequestMessage } from 'openai';
import { PRIVATE_OPENAI_API_KEY } from '$env/static/private';
import { ResponseType } from '$lib/chat';

const configuration = new Configuration({
	apiKey: PRIVATE_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { message, responseType } = (await request.json()) as {
			message: string;
			responseType: ResponseType;
		};
		const messages: ChatCompletionRequestMessage[] = [];
		switch (responseType) {
			case ResponseType.ConinciseAnswers:
				messages.push({
					role: 'system',
					content:
						'Answer succinctly and directly, do not provide explanations or elaborations, simply state the direct response to the question asked'
				});
				break;
			case ResponseType.Explain:
				messages.push({
					role: 'system',
					content: 'Reply briefly and add an explanation of the answer at the end'
				});
				break;
			case ResponseType.Summarize:
				messages.push({
					role: 'system',
					content: 'Summarize the indicated content without introductions or elaborations'
				});
				break;
		}
		messages.push({ role: 'user', content: message });
		const completion = await openai.createChatCompletion({
			messages,
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

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
						'You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible. Answer in the language of the question. Do not provide explanations or elaborations'
				});
				break;
			case ResponseType.Explain:
				messages.push({
					role: 'system',
					content: 'You are ChatGPT, a large language model trained by OpenAI. Answer in the language of the question. Answer as concisely as possible. After that add the explanation of the answer'
				});
				break;
			case ResponseType.Summarize:
				messages.push({
					role: 'system',
					content: 'You are ChatGPT, a large language model trained by OpenAI. Answer in the language of the next message. Smmarize the indicated content'
				});
				break;
		}
		messages.push({ role: 'user', content: message });
		const completion = await openai.createChatCompletion({
			messages,
			model: 'gpt-3.5-turbo-0301'
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

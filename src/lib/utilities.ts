export function getErrorMessage(e: unknown) {
	if (typeof e === 'string') {
		return e;
	} else if (e instanceof Error) {
		return e.message;
	}
	return 'unknown';
}

export function handleError<TError extends { message: string }>({
	error
}:
	| {
			error: null;
	  }
	| {
			error: TError;
	  }) {
	if (error) {
		throw new Error(error.message, {
			cause: error
		});
	}
}

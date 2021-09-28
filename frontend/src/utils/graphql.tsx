import { API } from 'aws-amplify';
import type { GraphQLResult } from '@aws-amplify/api/lib-esm/types';
import type { GraphQLOptions } from '@aws-amplify/api-graphql/lib-esm/types';

export type GraphQLReturn<T> = Promise<GraphQLResult<T>>;

export type GraphQLCallback<T> = (
	error?: GraphQLResult['errors'],
	data?: GraphQLResult<T>['data']
) => void;

/**
 * @param options - The graphql options.
 * @param callback - Callback function that returns an error or data.
 */
function graphql<T = unknown>(
	options: GraphQLOptions,
	callback?: (
		error?: GraphQLResult['errors'],
		data?: GraphQLResult<T>['data']
	) => void
): GraphQLReturn<T> {
	const promise = (API.graphql(options) as unknown) as Promise<
		GraphQLResult<T>
	>;

	if (callback) {
		promise
			.then((res) => {
				if (callback && res.data) {
					callback(undefined, res.data);
				}
			})
			.catch((error: GraphQLResult<T>) => {
				if (callback && error.errors) {
					callback(error.errors);
				}
			});
	}
	return promise;
}

export default graphql;

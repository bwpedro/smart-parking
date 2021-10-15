import graphql, { GraphQLCallback, GraphQLReturn } from 'utils/graphql';
import * as Types from '../api/types';
import { login as loginQuery } from '../graphql/queries';

type LoginType = {
	login: Types.User;
};

export default async function login(
	input: Types.LoginInput,
	callback: GraphQLCallback<LoginType>
): GraphQLReturn<LoginType> {
	return graphql<LoginType>(
		{
			variables: {
				...input,
			},
			query: loginQuery,
		},
		callback
	);
}

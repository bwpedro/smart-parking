import graphql, { GraphQLCallback, GraphQLReturn } from 'utils/graphql';
import * as Types from '../api/types';
import { insertUser as insertUserMutation } from '../graphql/mutations';

type InsertUserType = {
	insertUser: boolean;
};

export default async function insertUser(
	input: Types.InsertUserInput,
	callback: GraphQLCallback<InsertUserType>
): GraphQLReturn<InsertUserType> {
	return graphql<InsertUserType>(
		{
			variables: {
				input,
			},
			query: insertUserMutation,
		},
		callback
	);
}

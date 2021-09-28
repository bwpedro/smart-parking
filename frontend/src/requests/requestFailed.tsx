import graphql, { GraphQLCallback, GraphQLReturn } from 'utils/graphql';
import * as Types from '../api/types';
import { requestFailed as requestFailedMutation } from '../graphql/mutations';

type NegotiationFailedType = {
	requestFailed: Types.Spot;
};

export default async function requestFailed(
	spotId: string,
	callback: GraphQLCallback<NegotiationFailedType>
): GraphQLReturn<NegotiationFailedType> {
	return graphql<NegotiationFailedType>(
		{
			variables: {
				spotId,
			},
			query: requestFailedMutation,
		},
		callback
	);
}

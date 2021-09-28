import graphql, { GraphQLCallback, GraphQLReturn } from 'utils/graphql';
import * as Types from '../api/types';
import { requestSuccess as requestSuccessMutation } from '../graphql/mutations';

type NegotiationSuccessType = {
	requestSuccess: Types.Spot;
};

export default async function requestSuccess(
	input: Types.RequestSpotInput,
	callback: GraphQLCallback<NegotiationSuccessType>
): GraphQLReturn<NegotiationSuccessType> {
	return graphql<NegotiationSuccessType>(
		{
			variables: {
				input,
			},
			query: requestSuccessMutation,
		},
		callback
	);
}

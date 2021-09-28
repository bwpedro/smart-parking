import graphql, { GraphQLCallback, GraphQLReturn } from 'utils/graphql';
import * as Types from '../api/types';
import { requestSpot as requestSpotMutation } from '../graphql/mutations';

type RequestSpotType = {
	requestSpot: Types.Spot;
};

export default async function requestSpot(
	input: Types.RequestSpotInput,
	callback: GraphQLCallback<RequestSpotType>
): GraphQLReturn<RequestSpotType> {
	return graphql<RequestSpotType>(
		{
			variables: {
				input,
			},
			query: requestSpotMutation,
		},
		callback
	);
}

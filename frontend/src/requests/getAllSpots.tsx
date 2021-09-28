import graphql, { GraphQLCallback, GraphQLReturn } from 'utils/graphql';
import * as Types from '../api/types';
import { getAllSpots as getAllSpotsQuery } from '../graphql/queries';

type GetAllSpotsType = {
	getAllSpots: Types.Spot[];
};

export default async function getAllSpots(
	callback: GraphQLCallback<GetAllSpotsType>
): GraphQLReturn<GetAllSpotsType> {
	return graphql<GetAllSpotsType>(
		{
			query: getAllSpotsQuery,
		},
		callback
	);
}

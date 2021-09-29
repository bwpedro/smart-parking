const { dynamodb } = require('./utils');
const { v4 } = require('uuid');

async function getSpotById(spotId) {
	return dynamodb.get(
		`${process.env.APP}-parking-${process.env.STAGE}`,
		'spot',
		spotId
	);
}

async function asyncInsertParkingSpot(spot) {
	return dynamodb.insertIntoTable(
		`${process.env.APP}-parking-${process.env.STAGE}`,
		{
			...spot,
		}
	);
}

async function getSpotsByStatus({ status }) {
	const result = await dynamodb.getFromTable(
		`${process.env.APP}-parking-${process.env.STAGE}`,
		'status',
		status
	);

	if (result) {
		return result;
	}

	return null;
}

async function getAllSpots() {
	const result = await dynamodb.getAll(
		`${process.env.APP}-parking-${process.env.STAGE}`
	);

	if (result) {
		return result;
	}

	return null;
}

async function getHistory({ filter }) {
	let result = null;

	if (filter.driverId) {
		result = await dynamodb.getFromTable(
			`${process.env.APP}-parking-history-${process.env.STAGE}`,
			'driverId',
			filter.driverId
		);
	} else if (filter.spot) {
		result = await dynamodb.getFromTable(
			`${process.env.APP}-parking-${process.env.STAGE}`,
			'spot',
			filter.spot
		);
	}

	if (result) {
		return result;
	}

	return null;
}

async function insertParkingSpots(args) {
	const { input } = args;

	const requests = [];

	for (let nSpot = 1; nSpot <= input.nSpots; nSpot += 1) {
		requests.push(
			asyncInsertParkingSpot({
				spot: `${input.sector}${nSpot}`,
				status: 'FREE',
				driverId: null,
				startTime: null,
				endTime: null,
				date: null,
				price: null,
			})
		);
	}

	const requestResult = await Promise.all(requests).then(
		(response) => response
	);

	return requestResult.every((result) => result);
}

async function updateParkingSpot(payload) {
	const result = await dynamodb.insertIntoTable(
		`${process.env.APP}-parking-${process.env.STAGE}`,
		payload
	);

	if (result) {
		return payload;
	}

	return null;
}

async function requestSpot(args) {
	const payload = {
		...args.input,
		status: 'IN_NEGOTIATION',
	};

	return updateParkingSpot(payload);
}

async function requestSuccess(args) {
	const payload = {
		...args.input,
		status: 'WAITING_FOR_PARKING',
	};

	return updateParkingSpot(payload);
}

async function clearSpot(spotId) {
	return updateParkingSpot({
		spot: spotId,
		status: 'FREE',
		driverId: null,
		startTime: null,
		endTime: null,
		date: null,
		price: null,
	});
}

async function requestFailed(args) {
	return clearSpot(args.spotId);
}

async function carArrived(args) {
	const [spot] = await getSpotById(args.spotId);

	if (!spot) {
		return null;
	}

	const payload = {
		...spot,
		status: 'BUSY',
	};

	if (await updateParkingSpot(payload)) {
		const result = dynamodb.insertIntoTable(
			`${process.env.APP}-parking-history-${process.env.STAGE}`,
			{
				uuid: v4(),
				timestamp: Date.now(),
				driverId: payload.driverId,
				spot: payload.spot,
				price: payload.price,
				status: 'ARRIVED',
			}
		);

		if (result) return payload;
	}

	return null;
}

async function carLeft(args) {
	const [spot] = await getSpotById(args.spotId);

	if (!spot) {
		return null;
	}

	const cleared = await clearSpot(args.spotId);

	if (cleared) {
		const result = dynamodb.insertIntoTable(
			`${process.env.APP}-parking-history-${process.env.STAGE}`,
			{
				uuid: v4(),
				timestamp: Date.now(),
				driverId: spot.driverId,
				spot: spot.spot,
				price: spot.price,
				status: 'LEFT',
			}
		);

		if (result) return cleared;
	}

	return null;
}

module.exports = {
	insertParkingSpots,
	getSpotsByStatus,
	getAllSpots,
	getHistory,
	requestSpot,
	requestSuccess,
	requestFailed,
	carArrived,
	carLeft,
};

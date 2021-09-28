import React, { createContext } from 'react';
import { graphqlOperation, API } from 'aws-amplify';

interface ISubscriptionContext {
	subscribe: <T>(
		payload: { [key in string]: string },
		onNext: (response: T | null) => void
	) => void;
	subscribeWithLimit: <T>(
		payload: { [key in string]: string },
		limitSubscription: { [key in string]: string },
		onNext: (response: T | null) => void
	) => void;
	unsubscribe: (key: string) => void;
}

interface Subscription<T> {
	value: {
		data: {
			[key in string]: T;
		};
	};
}

const SubscriptionContext = createContext<ISubscriptionContext | null>(null);

const SubscriptionProvider: React.FC = ({ children }) => {
	const subscriptions$ = new Map<string, ZenObservable.Subscription>();

	function unsubscribe(key: string) {
		const sub = subscriptions$.get(key);
		if (sub) {
			subscriptions$.delete(key);
			if (!sub.closed) {
				sub.unsubscribe();
			}
		}
	}

	function subscribe<T>(
		payload: { [key in string]: string },
		onNext: (response: T | null) => void
	): void {
		const key = Object.keys(payload)[0];
		if (!key) return;

		try {
			const sub = (API.graphql(
				graphqlOperation(payload[key])
			) as Observable<Subscription<T>>).subscribe(
				(response: Subscription<T>) => {
					if (response.value) {
						onNext(response.value.data[key]);
					}

					onNext(null);
				}
			);
			subscriptions$.set(key, sub);
		} catch {
			unsubscribe(key);
		}
	}

	function subscribeWithLimit<T>(
		payload: { [key in string]: string },
		limitSubscription: { [key in string]: string },
		onNext: (response: T | null) => void
	): void {
		const key = Object.keys(payload)[0];
		if (!key) return;

		try {
			const sub = (API.graphql(
				graphqlOperation(payload[key], limitSubscription)
			) as Observable<Subscription<T>>).subscribe(
				(response: Subscription<T>) => {
					if (response.value) {
						onNext(response.value.data[key]);
					}

					onNext(null);
				}
			);
			subscriptions$.set(key, sub);
		} catch {
			unsubscribe(key);
		}
	}

	return (
		<SubscriptionContext.Provider
			value={{
				subscribe,
				subscribeWithLimit,
				unsubscribe,
			}}
		>
			{children}
		</SubscriptionContext.Provider>
	);
};

export function useSubscription(): ISubscriptionContext | null {
	return React.useContext(SubscriptionContext);
}

export default SubscriptionProvider;

import React, { createContext, useState, useCallback } from 'react';

interface IFormContext {
	getValues: Record<string, unknown>;
	setFormValues: (user: Record<string, unknown>) => void;
}

const FormContext = createContext<IFormContext | null>(null);

const FormProvider: React.FC = ({ children }) => {
	const [getValues, setGetValues] = useState<Record<string, unknown>>({});

	const setFormValues = useCallback(
		(newValues: Record<string, unknown>) => {
			setGetValues((previous: Record<string, unknown>) => ({
				...previous,
				...newValues,
			}));
		},
		[setGetValues]
	);

	return (
		<FormContext.Provider
			value={{
				getValues,
				setFormValues,
			}}
		>
			{children}
		</FormContext.Provider>
	);
};

export function useForm(): IFormContext {
	const value = React.useContext(FormContext);

	if (!value) {
		throw new Error('Error creating context');
	}

	return value;
}

export default FormProvider;

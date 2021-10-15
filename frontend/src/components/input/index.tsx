import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import MuiFormControl from '@material-ui/core/FormControl';
import { useForm } from 'context/form';

interface InputProperties {
	name: string;
	label: string;
}

const Input: React.FC<InputProperties & TextFieldProps> = ({
	name,
	label,
	...rest
}) => {
	const { getValues, setFormValues } = useForm();

	return (
		<MuiFormControl fullWidth>
			<TextField
				{...rest}
				name={name}
				onChange={(event) => {
					setFormValues({
						[event.target.name]: event.target.value,
					});
				}}
				value={getValues.name}
				required
				variant="outlined"
				label={label}
				color="secondary"
			/>
		</MuiFormControl>
	);
};

export default Input;

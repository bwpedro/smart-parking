/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
	FormControl,
	Button,
	IconButton,
	InputAdornment,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Input from 'components/input';
import { CPFMask } from 'components/input/utils';
import { useForm } from 'context/form';
import { useParking } from 'context/parking';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import insertUser from 'requests/insertUser';
import * as Types from '../../api/types';
import useStyles from './styles';

interface NewUserProperties {
	handleCancelNewUser: () => void;
}

const NewUser: React.FC<NewUserProperties> = ({ handleCancelNewUser }) => {
	const { setCurrentUser } = useParking();
	const { getValues } = useForm();
	const history = useHistory();
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [passVisibility, setPassVisibility] = useState(false);

	function handleSubmit() {
		if (
			!getValues.driverId &&
			!getValues.password &&
			!getValues.firstName &&
			!getValues.lastName
		) {
			return;
		}

		setLoading(true);

		const newUser: Types.InsertUserInput = {
			driverId: getValues.driverId as string,
			firstName: getValues.firstName as string,
			lastName: getValues.lastName as string,
			role: 'driver',
			password: getValues.password as string,
		};

		void insertUser(newUser, (error, result) => {
			setLoading(false);

			if (result && result.insertUser) {
				const { password, ...currentUser } = newUser;
				setCurrentUser(currentUser as Types.User);
				window.localStorage.setItem(
					'user',
					JSON.stringify(currentUser)
				);

				history.push('/driver');
			} else if (error) {
				console.error(error);
			}
		});
	}

	return (
		<>
			<FormControl fullWidth className={classes.formControl}>
				<Input
					name="driverId"
					label="CPF"
					InputProps={{
						inputComponent: CPFMask,
					}}
					pattern={
						/^(\d{3}.?\d{3}\.?\d{3}-?\d{2}|\d{2}(?:.?\d{3}){2}\/?\d{4}-?\d{2})$/
					}
				/>
			</FormControl>
			<FormControl fullWidth className={classes.formControl}>
				<Input name="firstName" label="Nome" />
			</FormControl>
			<FormControl fullWidth className={classes.formControl}>
				<Input name="lastName" label="Sobrenome" />
			</FormControl>
			<FormControl fullWidth className={classes.formControl}>
				<Input
					name="password"
					label="Senha"
					type={passVisibility ? 'text' : 'password'}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() =>
										setPassVisibility(
											(previous) => !previous
										)
									}
									edge="end"
								>
									{passVisibility ? (
										<Visibility />
									) : (
										<VisibilityOff />
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</FormControl>
			<Button
				style={{ width: 320 }}
				onClick={handleSubmit}
				variant="contained"
				color="secondary"
				disabled={loading}
			>
				CADASTRAR
			</Button>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: 24,
				}}
			>
				<a className={classes.newUser} onClick={handleCancelNewUser}>
					cancelar
				</a>
			</div>
		</>
	);
};

export default NewUser;

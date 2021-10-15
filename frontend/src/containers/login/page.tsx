/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useParking } from 'context/parking';
import FormProvider, { useForm } from 'context/form';
import Input from 'components/input';
import Button from '@material-ui/core/Button';
import login from 'requests/login';
import { useHistory } from 'react-router';
import FormControl from '@material-ui/core/FormControl';
import NewUser from 'containers/new-user/page';
import { CPFMask } from 'components/input/utils';
import { InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff, AccountCircle } from '@material-ui/icons';
import useStyles from './styles';
import * as Types from '../../api/types';

interface LoginFormProperties {
	handleNewUser: () => void;
}

const LoginForm: React.FC<LoginFormProperties> = ({ handleNewUser }) => {
	const { setCurrentUser } = useParking();
	const { getValues } = useForm();
	const history = useHistory();
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [passVisibility, setPassVisibility] = useState(false);

	function handleSubmit() {
		if (!getValues.driverId && !getValues.password) {
			return;
		}

		setLoading(true);

		const loginInput: Types.LoginInput = {
			driverId: getValues.driverId as string,
			password: getValues.password as string,
		};

		void login(loginInput, (error, result) => {
			setLoading(false);

			if (result && result.login) {
				setCurrentUser(result.login);
				window.localStorage.setItem(
					'user',
					JSON.stringify(result.login)
				);

				if (result.login.role === 'admin') {
					history.push('/parking');
				} else {
					history.push('/driver');
				}
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
						endAdornment: (
							<InputAdornment position="end" color="primary">
								<AccountCircle />
							</InputAdornment>
						),
					}}
					pattern={
						/^(\d{3}.?\d{3}\.?\d{3}-?\d{2}|\d{2}(?:.?\d{3}){2}\/?\d{4}-?\d{2})$/
					}
				/>
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
				ENTRAR
			</Button>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: 24,
				}}
			>
				<a className={classes.newUser} onClick={handleNewUser}>
					cadastrar
				</a>
			</div>
		</>
	);
};

const Login: React.FC = () => {
	const classes = useStyles();
	const [newUser, setNewUser] = useState(false);

	function handleNewUser() {
		setNewUser(true);
	}

	function handleCancelNewUser() {
		setNewUser(false);
	}

	return (
		<div className={classes.loginPage}>
			<div className={classes.formContainer}>
				<div className={classes.logoContainer}>
					<img
						src="https://www.smartparking.ipb.pt/images/logo.png"
						alt="Logo"
					/>
				</div>
				<FormProvider>
					{newUser ? (
						<NewUser handleCancelNewUser={handleCancelNewUser} />
					) : (
						<LoginForm handleNewUser={handleNewUser} />
					)}
				</FormProvider>
			</div>
		</div>
	);
};

export default Login;

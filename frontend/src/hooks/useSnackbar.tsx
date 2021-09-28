import React, { useCallback } from 'react';
import * as notistack from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useSnackbar = (): ((
	message: string | null,
	variant: notistack.VariantType | undefined
) => notistack.SnackbarKey) => {
	const { enqueueSnackbar, closeSnackbar } = notistack.useSnackbar();

	return useCallback(
		(message = 'ERROR_INTERNAL', variant = 'error') =>
			enqueueSnackbar(message, {
				variant,
				autoHideDuration: null,
				action: (key) => (
					<IconButton
						style={{
							color: 'white',
							height: 38,
							width: 38,
						}}
						onClick={(): void => {
							closeSnackbar(key);
						}}
					>
						<HighlightOffIcon />
					</IconButton>
				),
			}),
		[enqueueSnackbar, closeSnackbar]
	);
};

export default useSnackbar;

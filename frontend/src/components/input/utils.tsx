import React from 'react';
import MaskedInput from 'react-text-mask';

export interface TextMaskCustomProperties {
	inputRef: (reference: HTMLInputElement | null) => void;
}

export function CPFMask(properties: TextMaskCustomProperties): JSX.Element {
	const { inputRef, ...other } = properties;
	const mask = [
		/\d/,
		/\d/,
		/\d/,
		'.',
		/\d/,
		/\d/,
		/\d/,
		'.',
		/\d/,
		/\d/,
		/\d/,
		'-',
		/\d/,
		/\d/,
	];
	return (
		<MaskedInput
			{...other}
			guide={false}
			mask={mask}
			placeholder="000.000.000-00"
			ref={(reference: MaskedInput): void => {
				inputRef(
					reference
						? (reference.inputElement as HTMLInputElement)
						: null
				);
			}}
			onKeyDown={(e) => {
				const { onChange } = other;

				const cursorPos = Number(e.target.selectionStart);
				const keyCode = Number(e.keyCode);

				if (
					(cursorPos === 4 || cursorPos === 8 || cursorPos === 12) &&
					keyCode === 8
				) {
					e.preventDefault();

					e.target.value = e.target.value.slice(
						0,
						Math.max(0, e.target.value.length - 1)
					);

					if (onChange) onChange(e);
				}
			}}
		/>
	);
}

// https://stackoverflow.com/questions/52005083/how-to-define-css-variables-in-style-attribute-in-react-and-typescript

type CustomProp = { [key in `--${string}`]: string };

declare module React {
	export interface CSSProperties extends CustomProp {}
}

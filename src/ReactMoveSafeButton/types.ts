export type CustomButton = (
  ref: React.MutableRefObject<any>,
  disabled: boolean | undefined,
  buttonProps: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => JSX.Element

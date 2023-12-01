type ButtonType = "submit" | "reset" | "button";
type buttonVariant = "contained" | "outlined" | "text";
type buttonColor =
  | "error"
  | "info"
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "warning";

export interface CustomButtonProps {
  buttonTitle: string;
  type?: ButtonType;
  variant?: buttonVariant;
  color?: buttonColor;
  onChange?: () => void;
}
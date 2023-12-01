import * as React from "react";
import Button from "@mui/material/Button";
import { CustomButtonProps } from "./CustomButton.types";

const CustomButton: React.FC<CustomButtonProps> = ({
  buttonTitle,
  type = "button",
  variant = "contained",
  color = "primary",
  onChange,
}) => {
  return (
    <Button onClick={onChange} color={color} type={type} variant={variant}>
      {buttonTitle}
    </Button>
  );
};

export default CustomButton;

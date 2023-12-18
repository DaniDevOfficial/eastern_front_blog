import { PropsWithChildren } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

interface FromProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  color?: string;
}

export function Form({
  label,
  helperText,
  errorText,
  isRequired,
  isInvalid,
  children,
  color = "black",
}: PropsWithChildren<FromProps>) {
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel color={color}>{label}</FormLabel>
      {children}
      {isInvalid ? (
        <FormErrorMessage color={color}>{errorText}</FormErrorMessage>
      ) : (
        <FormHelperText color={color}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

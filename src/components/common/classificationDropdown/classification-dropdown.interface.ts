import { ITextInputFieldRef } from '../textInputField';

export interface IClassificationDropdownProps {
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
  required?: boolean;
}

export interface IClassificationDropdownRef extends ITextInputFieldRef {}
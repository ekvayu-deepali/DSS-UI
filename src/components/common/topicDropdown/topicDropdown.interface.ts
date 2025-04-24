import { ITextInputFieldRef } from '../textInputField';

export interface ITopicDropdownProps {
  value: string[];
  onChange: (value: string[]) => void;
  fullWidth?: boolean;
  required?: boolean;
}

export interface ITopicDropdownRef extends ITextInputFieldRef {}
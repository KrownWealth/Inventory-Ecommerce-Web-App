type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';

export type FormFieldType = {
  label: string;
  htmlFor: string;
  name: string;
  type: InputType;
  isInvalid: boolean; 
  errorMessage?: string; 
  startcnt?: string;
  height?: string;
  reqValue?: string;
  onChange: (value: string | number) => void;
  required?: boolean;
  readOnly?: boolean;
}

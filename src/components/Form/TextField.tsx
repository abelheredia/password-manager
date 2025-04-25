import { Input } from 'antd';
import { Controller, FieldValues } from 'react-hook-form';

type TextFieldProps = {
  hookForm: FieldValues;
  name: string;
  label: string;
  className?: string;
};

export const TextField: React.FC<TextFieldProps> = ({ hookForm, name, label, className }) => {
  return (
    <Controller
      name={name}
      control={hookForm.control}
      render={({ field }) => <Input {...field} value={field.value} placeholder={label} variant="filled" className={className} />}
    />
  );
};

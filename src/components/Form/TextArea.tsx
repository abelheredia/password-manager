import { Input } from 'antd';
import { Controller, FieldValues } from 'react-hook-form';

type TextAreaProps = {
  hookForm: FieldValues;
  name: string;
  label: string;
};

export const TextArea: React.FC<TextAreaProps> = ({ hookForm, name, label }) => {
  return (
    <Controller
      name={name}
      control={hookForm.control}
      render={({ field }) => <Input.TextArea rows={10} {...field} value={field.value} placeholder={label} variant="filled" />}
    />
  );
};

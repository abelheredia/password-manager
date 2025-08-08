import { Input, Typography } from 'antd';
import { Controller, FieldValues } from 'react-hook-form';
const { Text } = Typography;
type TextAreaProps = {
  hookForm: FieldValues;
  name: string;
  label: string;
};

export const TextArea: React.FC<TextAreaProps> = ({ hookForm, name, label }) => {
  const {
    formState: { errors }
  } = hookForm;
  return (
    <Controller
      name={name}
      control={hookForm.control}
      render={({ field }) => (
        <>
          <Input.TextArea rows={10} {...field} value={field.value} placeholder={label} variant="filled" />
          <Text style={{ fontSize: '10px' }} type="danger">
            {errors[name]?.message}
          </Text>
        </>
      )}
    />
  );
};

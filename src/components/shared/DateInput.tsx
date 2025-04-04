import { colors } from '@/styles';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { SquarePen } from 'lucide-react-native';
import moment from 'moment';
import { forwardRef, ReactNode, useState } from 'react';
import { Platform, TextInput, TextInputProps, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { InputContainer } from './InputContainer';

type DateInputProps = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  errorMessage?: string;
  label?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
} & Omit<TextInputProps, 'value' | 'onChange'>;

const DATE_FORMAT = 'DD/MM/YYYY';

const today = new Date();

export const DateInput = forwardRef<TextInput, DateInputProps>(
  function DateInput(
    {
      value,
      label,
      placeholder = DATE_FORMAT,
      errorMessage,
      prefix,
      suffix,
      onChange,
      editable,
      ...props
    },
    ref,
  ) {
    const [inputText, setInputText] = useState('');
    const formattedDate = value ? moment(value).format(DATE_FORMAT) : '';
    const [isDateTimePickerVisible, setIsDateTimePickerVisible] =
      useState(false);
    const inputValue =
      value && !isNaN(value?.getTime()) ? formattedDate : inputText;

    const onSelectDate = (date: Date) => {
      onChange(date);
      setIsDateTimePickerVisible(false);
    };

    const showDateTimePicker = () => {
      if (Platform.OS === 'android') {
        DateTimePickerAndroid.open({
          value: value || today,
          onChange: (event, date) => {
            if (event.type === 'set') {
              onChange(date);
            } else {
              DateTimePickerAndroid.dismiss('date');
            }
          },
        });
      } else {
        setIsDateTimePickerVisible(true);
      }
    };

    const handleDateChange = (text: string) => {
      const cleanedInput = text.replace(/\D/g, '');

      const limitedInput = cleanedInput.slice(0, 8);

      let formatted = limitedInput;
      if (limitedInput.length > 2) {
        formatted = `${limitedInput.slice(0, 2)}/${limitedInput.slice(2)}`;
      }
      if (limitedInput.length > 4) {
        formatted = `${limitedInput.slice(0, 2)}/${limitedInput.slice(2, 4)}/${limitedInput.slice(4)}`;
      }

      if (inputText.length > formatted.length) {
        onChange(undefined);
      } else if (formatted.length === 10) {
        const date = moment(formatted, DATE_FORMAT).toDate();

        onChange(date);
      }

      setInputText(formatted);
    };

    return (
      <>
        <InputContainer
          label={label}
          errorMessage={errorMessage}
          value={inputValue}
        >
          <TouchableOpacity onPress={showDateTimePicker}>
            <View className="w-full flex-row items-center rounded-2xl border border-gray-800 p-4 gap-2 bg-background">
              {prefix && <View className="w-7">{prefix}</View>}
              <TextInput
                placeholder={placeholder}
                placeholderTextColor={colors.gray1}
                ref={ref}
                keyboardType="numeric"
                maxLength={10}
                className="flex-1 color-white text-base font-urbanist-regular tracking-wider"
                onChangeText={handleDateChange}
                value={inputValue}
                {...props}
              />
              <View className="w-7">
                {suffix || (
                  <TouchableOpacity
                    className="w-6"
                    onPress={showDateTimePicker}
                  >
                    <SquarePen size={22} color={colors.gray1} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </InputContainer>
        <DateTimePickerModal
          isVisible={isDateTimePickerVisible}
          maximumDate={today}
          date={value || today}
          mode="date"
          display="inline"
          onConfirm={onSelectDate}
          onCancel={() => setIsDateTimePickerVisible(false)}
          themeVariant="dark"
          isDarkModeEnabled
          accentColor={colors.primary}
        />
      </>
    );
  },
);

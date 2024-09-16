import { TextInput, View } from 'react-native';
import { styles } from './DateInput.styles';
import { DateInputProps } from './DateInput.types';
import moment from 'moment';
import { InputContainer } from '../InputContainer/InputContainer';
import { useRef, useState } from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SquarePen } from 'lucide-react-native';
import { colors } from '@/styles';

const DATE_FORMAT = 'DD/MM/YYYY';

const today = new Date();

export function DateInput({
  type = 'text',
  value,
  label,
  placeholder = DATE_FORMAT,
  errorMessage,
  prefix,
  suffix,
  onChange,
  editable,
  ...props
}: DateInputProps) {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<TextInput>(null);
  const formattedDate = value ? moment(value).format(DATE_FORMAT) : '';
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const inputValue =
    value && !isNaN(value?.getTime()) ? formattedDate : inputText;

  const onSelectDate = (event: DateTimePickerEvent, date?: Date) => {
    if (date && event.type === 'set') onChange(date);
    setIsDateTimePickerVisible(false);
  };

  const showDateTimePicker = () => {
    setIsDateTimePickerVisible(true);
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
          <View style={styles.inputArea}>
            {prefix && <View style={styles.iconArea}>{prefix}</View>}
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={colors.gray1}
              ref={inputRef}
              keyboardType="numeric"
              maxLength={10}
              style={styles.input}
              onChangeText={handleDateChange}
              value={inputValue}
            />
            <View style={styles.iconArea}>
              {suffix || (
                <TouchableOpacity
                  style={styles.iconArea}
                  onPress={showDateTimePicker}
                >
                  <SquarePen size={22} color={colors.gray1} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </InputContainer>
      {isDateTimePickerVisible && (
        <DateTimePicker
          maximumDate={today}
          value={value || today}
          mode="date"
          display="spinner"
          onChange={onSelectDate}
          disabled={!editable}
        />
      )}
    </>
  );
}

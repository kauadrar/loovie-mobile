import { Link } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../Text/Text';
import { styles } from './Button.styles';
import { ButtonProps } from './Button.types';

export function Button({ label, style, href = '', ...props }: ButtonProps) {
  const ButtonContainer = href ? Link : View;
  return (
    <ButtonContainer href={href} asChild style={styles.buttonArea}>
      <TouchableOpacity style={[styles.button, style]} {...props}>
        <Text style={styles.buttonText} weight="Medium">
          {label}
        </Text>
      </TouchableOpacity>
    </ButtonContainer>
  );
}

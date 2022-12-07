import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {styles, color} from '../../utils/styles';
import {ButtonIcon, Divider, InputText} from '../atoms';

function FormInput({
  label,
  type,
  solid,
  textRight,
  placeholder,
  value,
  disabled,
  onChangeText,
  refInput,
  secureTextEntry,
  onKeyPress,
  onSubmitEditing,
  multiline,
  icon,
}) {
  const [isFocus, setFocus] = useState(null);
  let brcolor = '';
  let bgcolor = 'transparent';
  let brradius = 8;
  let padhrz = 10;
  if (type === 'outline') {
    brcolor = color.line;
  }
  if (type === 'solid' || disabled) {
    bgcolor = solid ? solid : color.tgrey2;
    brcolor = solid ? solid : color.tgrey2;
  }
  return (
    <View>
      {label && (
        <>
          <Text style={styles.textBase()}>{label}</Text>
          <Divider width={10} />
        </>
      )}
      <View
        style={stylesCust.inputText(
          isFocus ? color.bluep5 : brcolor,
          brradius,
          padhrz,
          bgcolor,
          multiline ? 100 : 40,
        )}>
        <InputText
          myHeight={multiline ? 100 : null}
          textRight={textRight}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChangeText={onChangeText}
          refInput={refInput}
          secureTextEntry={secureTextEntry}
          onKeyPress={onKeyPress}
          onSubmitEditing={onSubmitEditing}
          multiline={multiline}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
        />
        {icon?.name ? (
          <ButtonIcon
            type={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              color: icon?.color ? icon.color : color.blue,
            }}
            style={stylesCust.inputIcon}
            name={icon.name}
            size={20}
            onClick={icon.onClick}
          />
        ) : null}
      </View>
    </View>
  );
}

const stylesCust = StyleSheet.create({
  input: (textRight = 'left') => ({
    fontFamily: 'Poppins-Medium',
    width: '100%',
    textAlign: textRight,
    color: color.grey2,
    backgroundColor: color.white2,
  }),
  inputText: (
    borderColor,
    borderRadius,
    paddingHorizontal,
    backgroundColor,
    height,
  ) => ({
    height: height,
    flexDirection: 'row',
    borderColor: borderColor,
    borderWidth: 1,
    borderRadius: borderRadius,
    paddingHorizontal: paddingHorizontal,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColor,
  }),
  inputIcon: {
    paddingLeft: 17,
    marginVertical: 10,
    justifyContent: 'center',
  },
});

export default FormInput;

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ButtonIcon} from '../../components/atoms';
import {FormInput} from '../../components/molecules';
import {color} from '../../utils/styles';

const RouteForm = ({
  label,
  placeholder,
  input,
  icon,
  onClick,
  onChangeText,
  onClearText,
}) => {
  return (
    <View style={stylesCust.routeForm}>
      <View style={stylesCust.routeInput}>
        <FormInput
          placeholder={placeholder}
          label={label}
          type="outline"
          value={input}
          onChangeText={onChangeText}
          icon={{
            name: input ? 'times' : null,
            color: color.grey,
            onClick: onClearText,
          }}
        />
      </View>
      <View style={stylesCust.routeIcon}>
        <ButtonIcon
          type={stylesCust.iconTransparent(icon.color)}
          alignSelf="flex-end"
          name={icon.name}
          size={25}
          style={stylesCust.iconCust}
          onClick={onClick}
        />
      </View>
    </View>
  );
};
const stylesCust = StyleSheet.create({
  routeForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeInput: {width: '85%'},
  routeIcon: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  iconTransparent: (clr = color.green3) => ({
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: clr,
  }),
  iconCust: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RouteForm;

import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color, styles} from '../../utils/styles';
import {ButtonIcon, Divider, InputText} from '../atoms';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function NavHeader({title, subtitle, onClick, onSearch, onProfile}) {
  const [isSearch, setSearch] = useState('');
  return (
    <TouchableOpacity
      onPress={onClick ? onClick : null}
      style={stylesCust.header}>
      {onClick ? (
        <ButtonIcon
          type={stylesCust.buttonType}
          style={stylesCust.buttonFloat}
          name="chevron-left"
          size={20}
          // onClick={onClick}
        />
      ) : null}
      {onSearch ? (
        <View style={stylesCust.search}>
          <Divider width={30} />
          <View style={stylesCust.searchInput}>
            <FontAwesome5 name="search" size={20} color={color.tgrey3} />
            <Divider width={10} />
            <InputText
              placeholder="Search"
              value={isSearch}
              onChangeText={value => setSearch(value)}
              returnKeyType="search"
              onSubmitEditing={onSearch}
            />
          </View>
          <Divider width={30} />
          {onProfile ? (
            <>
              <TouchableOpacity onPress={onProfile} style={stylesCust.profile}>
                <FontAwesome5 name="user" size={20} color={color.white} />
              </TouchableOpacity>
              <Divider width={30} />
            </>
          ) : null}
        </View>
      ) : null}
      {title ? <Text style={stylesCust.title}>{title}</Text> : null}
      {subtitle ? <Text style={stylesCust.subtitle}>{subtitle}</Text> : null}
    </TouchableOpacity>
  );
}

const stylesCust = StyleSheet.create({
  profile: {
    backgroundColor: color.bluep,
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: color.line,
    borderRadius: 8,
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    backgroundColor: color.white,
    width: '100%',
    height: 87,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonType: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: color.tblack,
  },
  buttonFloat: {position: 'absolute', left: 0, marginLeft: 30},
  title: [styles.h3(color.tblack, 'center'), {textTransform: 'none'}],
  subtitle: [styles.p4(color.tgrey3, 'center'), {textTransform: 'none'}],
});

export default NavHeader;

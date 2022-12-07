import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {color, styles} from '../../utils/styles';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {env} from '../../utils';

function FormGooglePlace({id, placeholder}) {
  return (
    <View style={stylesCust.searchInput}>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        styles={stylesCust.placeInput}
        query={{
          key: env.GOOGLE_MAPS_APIKEY,
          language: 'en', // language of the results
        }}
        onPress={(data, details = null) => console.log(data, details)}
        fetchDetails={true}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        listEmptyComponent={() => (
          <View style={stylesCust.notFound}>
            <Text>No results were found</Text>
          </View>
        )}
      />
    </View>
  );
}

const stylesCust = StyleSheet.create({
  notFound: {flex: 1, backgroundColor: color.white, padding: 10},
  searchContainer: {
    position: 'absolute',
    top: 30,
    width: '100%',
    minHeight: 50,
    overflow: 'hidden',
    backgroundColor: color.loading,
  },
  searchInput: {
    flex: 1,
    paddingTop: 3,
    marginHorizontal: 30,
    // backgroundColor: color.white,
    borderRadius: 10,
  },
  placeInput: {
    textInputContainer: {
      height: 40,
    },
    textInput: {
      borderRadius: 0,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      height: 40,
      fontFamily: 'Poppins-Medium',
      fontSize: 13,
      color: color.tblack,
      // borderWidth: 1,
      // borderColor: '#000',
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
    },
  },
});

export default FormGooglePlace;

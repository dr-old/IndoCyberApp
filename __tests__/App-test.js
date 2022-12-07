import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import MapsSearch from '../src/containers/pages/MapsSearch';

describe('<UserScreen />', () => {
  test('should renders MapView and Marker with user current location', () => {
    render(<MapsSearch />);
  });
});

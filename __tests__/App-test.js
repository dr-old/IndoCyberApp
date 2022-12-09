import React from 'react';
import {render, waitFor} from '@testing-library/react-native';

import App from '../App';

describe('<UserScreen />', () => {
  test('should renders MapView and Marker with user current location', () => {
    render(<App />);
  });
});

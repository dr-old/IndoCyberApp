import React, {useState} from 'react';
import {View} from 'react-native';
import {ButtonLabel} from '../../../components/atoms';
import {Container} from '../../organism';
import AnimatedMarkers from './AnimatedMarkers';
import DraggableMarkers from './DraggableMarkers';
import MapsDirection from './MapsDirection';
import MapsPlace from './MapsPlace';

const Maps = ({route}) => {
  const {itemLocation} = route.params;
  const [isActive, setActive] = useState(null);
  const maps = [
    {name: 'AnimatedMarkers', comp: <AnimatedMarkers />},
    {name: 'MapsPlace', comp: <MapsPlace />},
  ];

  const MapsComponent = ({comp}) => {
    return comp;
  };

  return (
    <View style={{flex: 1}}>
      {/* <AnimatedMarkers location={itemLocation} /> */}
      <DraggableMarkers />
    </View>
  );
};

export default Maps;

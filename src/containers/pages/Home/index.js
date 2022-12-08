import * as React from 'react';
import {View, Text} from 'react-native';
import {ButtonIcon, Divider} from '../../../components/atoms';
import {CardProduct} from '../../../components/molecules';
import {color, styles} from '../../../utils/styles';
import {Container, ImageCarousel} from '../../organism';
import stylesCust from './stylesCust';
import useAction from './useAction';

function Home() {
  const {
    category,
    navigation,
    onScrollEnd,
    banner,
    product,
    isLoading,
    isProduct,
  } = useAction();

  const CardBalance = () => {
    return (
      <View style={stylesCust.cardBalance}>
        <View style={{flex: 1}}>
          <Text style={styles.p4(color.tgrey)}>Saldo</Text>
          <Text style={styles.h4(color.white)}>Rp. 1.000.000</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <ButtonIcon
            type={stylesCust.icon}
            label="Top Up"
            labelColor={color.white}
            name="plus-square"
            marginVertical={0}
            size={20}
            onClick={() => console.log('primary')}
          />
          <Divider width={10} />
          <ButtonIcon
            type={stylesCust.icon}
            label="Transfer"
            labelColor={color.white}
            name="paper-plane"
            marginVertical={0}
            size={20}
            onClick={() => console.log('primary')}
          />
        </View>
      </View>
    );
  };

  return (
    <Container
      bgColor={color.white8}
      navbar={{
        type: 'fixed',
        onSearch: () => console.log(),
        onProfile: () => console.log(),
      }}>
      <View style={stylesCust.card}>
        <Text style={styles.h5(color.bluep1)}>Promo buat kamu</Text>
        <Divider height={10} />
      </View>
      <ImageCarousel data={banner} autoPlay={true} />
      <View style={stylesCust.card}>
        <Text style={styles.h5(color.bluep1)}>Rekomendasi</Text>
        <Divider height={10} />
        <CardProduct data={isProduct.filter(item => item?.id)} />
      </View>
    </Container>
  );
}

export default Home;

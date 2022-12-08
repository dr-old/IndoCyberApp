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
    onSearch,
    signOut,
    isSearch,
    banner,
    product,
    isLoading,
    isProduct,
  } = useAction();

  return (
    <Container
      bgColor={color.white8}
      navbar={{
        type: 'fixed',
        onSearch: () => console.log(),
        onProfile: () => signOut(),
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

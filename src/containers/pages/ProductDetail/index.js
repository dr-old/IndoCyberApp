import * as React from 'react';
import {View, Text, ScrollView, Image, Platform} from 'react-native';
import {checkPluginState} from 'react-native-reanimated/lib/reanimated2/core';
import {
  ButtonIcon,
  ButtonImage,
  ButtonLabel,
  Divider,
} from '../../../components/atoms';
import {CardProduct} from '../../../components/molecules';
import helpers from '../../../utils/helpers';
import {color, styles} from '../../../utils/styles';
import {Container} from '../../organism';
import stylesCust from './stylesCust';
import useAction from './useAction';

function ProductDetail({route}) {
  const {itemData} = route.params;
  const {navigation, buy, isQty, setQty} = useAction();

  return (
    <Container
      bgColor={color.white8}
      navbar={{
        type: 'absolute',
        onClick: () => navigation.goBack(),
      }}>
      <Image source={{uri: itemData.image}} style={stylesCust.image} />
      <View style={stylesCust.price}>
        <Text style={styles.h3(color.white)}>
          {helpers.formatCurrency(itemData.price, 'Rp. ')}
        </Text>
      </View>
      <View style={stylesCust.card}>
        <Text style={styles.h4()}>{itemData.productName}</Text>
        <Divider height={10} />
        <Text style={styles.h6()}>Deskripsi</Text>
        <Text style={styles.p5(color.tgrey)}>
          Dimension : {itemData.dimension}
        </Text>
        <Text style={styles.p5(color.tgrey)}>Unit : {itemData.unit}</Text>
        <View style={stylesCust.qty}>
          <ButtonIcon
            type={stylesCust.buttonType(isQty <= 1 ? color.tgrey : null)}
            name="minus-circle"
            size={20}
            disabled={isQty <= 1 ? true : false}
            onClick={() => setQty(isQty - 1)}
          />
          <Text style={stylesCust.qtyText}>{isQty}</Text>
          <ButtonIcon
            type={stylesCust.buttonType()}
            name="plus-circle"
            size={20}
            onClick={() => setQty(isQty + 1)}
          />
        </View>
        <ButtonLabel
          type="primary"
          solid={true}
          label="Buy!"
          size="large"
          onClick={() => buy(itemData)}
        />
      </View>
    </Container>
  );
}

export default ProductDetail;

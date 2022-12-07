import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {color, styles} from '../../../utils/styles';
import Container from '../../organism/Container';
import {Divider} from '../../../components/atoms';

function Typography() {
  const navigation = useNavigation();
  return (
    <Container>
      <Text style={styles.h1()}>H1 I'm Jason Voorhees</Text>
      <Text style={styles.h2()}>H2 I'm Jason Voorhees</Text>
      <Text style={styles.h3()}>H3 I'm Jason Voorhees</Text>
      <Text style={styles.h4()}>H4 I'm Jason Voorhees</Text>
      <Text style={styles.h5()}>H5 I'm Jason Voorhees</Text>
      <Text style={styles.h6()}>H6 I'm Jason Voorhees</Text>
      <Text style={styles.h7()}>H7 I'm Jason Voorhees</Text>
      <Text style={styles.h8()}>H8 I'm Jason Voorhees</Text>
      <Text style={styles.h9()}>H9 I'm Jason Voorhees</Text>
      <Divider height={10} mTop={10} mBot={10} bgColor={color.white2} />
      <Text style={styles.p1()}>P1 I'm Jason Voorhees</Text>
      <Text style={styles.p2()}>P2 I'm Jason Voorhees</Text>
      <Text style={styles.p3()}>P3 I'm Jason Voorhees</Text>
      <Text style={styles.p4()}>P4 I'm Jason Voorhees</Text>
      <Text style={styles.p5()}>P5 I'm Jason Voorhees</Text>
      <Text style={styles.p6()}>P6 I'm Jason Voorhees</Text>
      <Divider height={10} mTop={10} mBot={10} bgColor={color.white2} />
      <Text
        style={styles.textBase(
          20,
          color.blue,
          'textBlackItalic',
          'capitalize',
        )}>
        I'm Jason Voorhees
      </Text>
      <Text style={styles.textBase(20, color.blue, 'textBold', 'capitalize')}>
        I'm Jason Voorhees
      </Text>
      <Text
        style={styles.textBase(20, color.blue, 'textBoldItalic', 'capitalize')}>
        I'm Jason Voorhees
      </Text>
      <Text
        style={styles.textBase(20, color.blue, 'textExtraBold', 'capitalize')}>
        I'm Jason Voorhees
      </Text>
      <Text
        style={styles.textBase(
          20,
          color.blue,
          'textExtraBoldItalic',
          'capitalize',
        )}>
        I'm Jason Voorhees
      </Text>
      <Text
        style={styles.textBase(20, color.blue, 'textExtraLight', 'capitalize')}>
        I'm Jason Voorhees
      </Text>
      <Text
        style={styles.textBase(
          20,
          color.blue,
          'textExtraLightItalic',
          'capitalize',
        )}>
        I'm Jason Voorhees
      </Text>
      <Text style={styles.textBase(20, color.blue, 'textItalic', 'capitalize')}>
        I'm Jason Voorhees
      </Text>
      <Text style={styles.textBase(20, color.blue, 'textLight', 'capitalize')}>
        I'm Jason Voorhees
      </Text>
      <Text
        style={styles.textBase(
          20,
          color.blue,
          'textLightItalic',
          'capitalize',
        )}>
        I'm Jason Voorhees
      </Text>
      <Text style={styles.textBase(20, color.blue, 'textMedium', 'capitalize')}>
        I'm Jason Voorhees
      </Text>
      <Text
        style={styles.textBase(
          20,
          color.blue,
          'textMediumItalic',
          'capitalize',
        )}>
        I'm Jason Voorhees
      </Text>
      <Text
        style={styles.textBase(20, color.blue, 'textRegular', 'capitalize')}>
        I'm Jason Voorhees
      </Text>
      <Text
        style={styles.textBase(20, color.blue, 'textSemiBold', 'capitalize')}>
        I'm Jason Voorhees
      </Text>
      <Text
        style={styles.textBase(
          20,
          color.blue,
          'textSemiBoldItalic',
          'capitalize',
        )}>
        I'm Jason Voorhees
      </Text>
      <Text style={styles.textBase(20, color.blue, 'textThin', 'capitalize')}>
        I'm Jason Voorhees
      </Text>
      <Text
        style={styles.textBase(20, color.blue, 'textThinItalic', 'capitalize')}>
        I'm Jason Voorhees
      </Text>
    </Container>
  );
}

export default Typography;

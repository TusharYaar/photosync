import React, {useState, useRef, useCallback} from 'react';
import {View, StyleSheet, Image, Keyboard} from 'react-native';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  Button,
  Text,
  TextInput,
  Headline,
  TouchableRipple,
  Caption,
} from 'react-native-paper';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

import PhoneNumberInput from '../components/PhoneNumberInput';

import COUNTRY_CODES from '../assets/country/countyCodes';
import {SvgUri} from 'react-native-svg';

import {AppStackParamList} from '../navigation/StackNavigators';

type Props = NativeStackScreenProps<AppStackParamList, 'Login'>;

const LoginScreen = ({navigation}: Props) => {
  const [number, setNumber] = useState('');

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [country, setCountry] = useState<typeof COUNTRY_CODES[number]>(
    COUNTRY_CODES[0],
  );

  const handleChangeCountry = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.snapToIndex(0);
  };
  const handleSetCountry = (item: typeof COUNTRY_CODES[number]) => {
    setCountry(item);
    bottomSheetRef.current?.close();
  };

  const handlePressInput = () => {
    bottomSheetRef.current?.close();
  };
  const handleNumberChange = (text: string) => {
    setNumber(text);
  };

  const renderItem = useCallback(
    ({item}: {item: typeof COUNTRY_CODES[number]}) => (
      <TouchableRipple onPress={() => handleSetCountry(item)}>
        <View style={styles.itemContainer}>
          <SvgUri uri={item.flag} style={styles.itemFlag} />
          <Text style={styles.itemText} numberOfLines={1}>
            {item.name}
          </Text>
          <Caption>{item.dialCode}</Caption>
        </View>
      </TouchableRipple>
    ),
    [],
  );

  return (
    <View style={styles.screen}>
      <Headline>Enter Your Phone</Headline>
      <Text>
        You will receive a 6 digit code for phone number verification.
      </Text>
      <PhoneNumberInput
        value={number}
        onChangeText={handleNumberChange}
        onPressChangeCountry={handleChangeCountry}
        country={country}
        onPressInput={handlePressInput}
      />
      <Button
        onPress={() => navigation.navigate('InputCode', {number})}
        mode="contained"
        style={styles.button}
        disabled={!number.match('^[0-9]{10}$')}>
        Continue
      </Button>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['70%']}
        index={-1}
        enablePanDownToClose={true}>
        <BottomSheetFlatList data={COUNTRY_CODES} renderItem={renderItem} />
      </BottomSheet>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    marginHorizontal: 10,
  },
  itemFlag: {
    width: 30,
    height: 30,
  },
});

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {Title, TouchableRipple, TextInput, Caption} from 'react-native-paper';
import COUNTRY_CODES from '../assets/country/countyCodes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onPressChangeCountry: () => void;
  onPressInput: () => void;
  country: typeof COUNTRY_CODES[number];
};

const PhoneNumberInput = ({
  value,
  country,
  onChangeText,
  onPressInput,
  onPressChangeCountry,
}: Props) => {
  return (
    <View>
      <TouchableRipple onPress={onPressChangeCountry}>
        <View style={styles.countryContainer}>
          <SvgUri uri={country.flag} style={styles.countryFlag} />
          <Title style={styles.country} numberOfLines={1}>
            {country?.name}
          </Title>
          <Icon name="chevron-down" size={30} />
        </View>
      </TouchableRipple>
      <TextInput
        onPressIn={onPressInput}
        left={<TextInput.Affix text={`${country.dialCode} `} />}
        value={value}
        onChangeText={onChangeText}
        placeholder="Phone Number"
        autoComplete="tel"
        autoFocus
        keyboardType="phone-pad"
        maxLength={10}
      />
      {value !== '' && !value.match('^[0-9]{10}$') && (
        <Caption>Invalid Number</Caption>
      )}
    </View>
  );
};

export default PhoneNumberInput;

const styles = StyleSheet.create({
  countryContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countryFlag: {
    width: 40,
    height: 40,
  },
  country: {
    flex: 1,
    marginHorizontal: 10,
  },
});

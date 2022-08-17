import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../navigation/StackNavigators';
import {useApp} from '../context/AppContext';
import {Button, TextInput} from 'react-native-paper';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

type Props = NativeStackScreenProps<AppStackParamList, 'InputCode'>;

const InputCodeScreen = ({navigation, route}: Props) => {
  const {signInUser, resendCodeIn} = useApp();

  const phoneNumber = route.params.number;
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState(__DEV__ ? '123456' : '');
  const signInWithPhoneNumber = useCallback(
    async (phoneNumber: string) => {
      if (signInUser && phoneNumber && resendCodeIn === 0) {
        const confirm = await signInUser(phoneNumber);
        setConfirm(confirm);
      }
    },
    [signInUser],
  );

  useEffect(() => {
    // signInWithPhoneNumber(phoneNumber);
  }, [phoneNumber, signInWithPhoneNumber]);

  const handleSubmit = async () => {
    try {
      await confirm?.confirm(code);
      navigation.replace('Terms');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.screen}>
      {resendCodeIn !== 0 && (
        <Text>Resend Code in {90 - resendCodeIn} seconds</Text>
      )}
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button
        onPress={handleSubmit}
        mode="contained"
        disabled={code.length !== 6}>
        Continue
      </Button>
      <Button
        onPress={() => signInWithPhoneNumber(phoneNumber)}
        disabled={resendCodeIn !== 0}>
        Resend
      </Button>
    </View>
  );
};

export default InputCodeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
});

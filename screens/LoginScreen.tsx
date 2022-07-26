import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {Button, Text, TextInput} from 'react-native-paper';

function LoginScreen() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');

  const handlePressSignIn = async () => {
    if (number.length > 5) {
      const confirmation = await auth().signInWithPhoneNumber(number);
      setConfirm(confirmation);
    }
  };

  async function confirmCode() {
    if (confirm === null) return;
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <View>
        <TextInput
          value={number}
          onChangeText={text => setNumber(text)}
          keyboardType="phone-pad"
        />
        <Button onPress={handlePressSignIn}>Sign In With Phone</Button>
      </View>
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button onPress={() => confirmCode()}>Confirm</Button>
    </>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

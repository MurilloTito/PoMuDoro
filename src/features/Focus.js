import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import { FocusHistory } from './FocusHistory';

export const Focus = ({ addSubject, focusHistory}) => {
  const [subject, setSubject] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          label="No que você quer focar agora?"
          onChangeText={setSubject}>
        </TextInput>
        <RoundedButton onPress={() => addSubject(subject)} title="+" size={50}/>
      </View>
      <FocusHistory addFocusHistory={focusHistory}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    margin: 12,
    padding: 10,
    marginRight: 5,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 30,
    marginRight: 15,
    marginLeft: 4,
  },
});

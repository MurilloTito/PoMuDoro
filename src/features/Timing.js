import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import { RoundedButton } from '../components/RoundedButton';

export const Timing = ({ onChangeTime }) => {
  const[firstButtonColor, setFirstButtonColor] = useState('white');
  const[secondButtonColor, setSecondButtonColor] = useState('white');
  const[thirdButtonColor, setThirdButtonColor] = useState('white');

  const onPress = (title) => {
    if (title === "15") {
      onChangeTime(15);
      setFirstButtonColor('#00ff00');
      setSecondButtonColor('white');
      setThirdButtonColor('white');
    }
    if (title === "30") {
      onChangeTime(30);
      setSecondButtonColor('#00ff00');
      setFirstButtonColor('white');
      setThirdButtonColor('white');
    }
    if (title === "45") {
      onChangeTime(45);
      setThirdButtonColor('#00ff00');
      setFirstButtonColor('white');
      setSecondButtonColor('white');
    }
  }

  return(
    <View style={styles.times}>
      <RoundedButton title ="15" size={90} style={{borderColor: firstButtonColor}} onPress={() => onPress("15")}/>
      <RoundedButton title ="30" size={90} style={{borderColor: secondButtonColor}} onPress={() => onPress("30")}/>
      <RoundedButton title ="45" size={90} style={{borderColor: thirdButtonColor}} onPress={() => onPress("45")}/>
    </View>
  );
};

const styles = StyleSheet.create({
  times: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
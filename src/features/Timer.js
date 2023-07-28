import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Dimensions, Vibration} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Countdown } from '../components/Countdown';
import { useKeepAwake } from 'expo-keep-awake';
import { colors} from '../utils/colors';
import { RoundedButton } from '../components/RoundedButton';
import { Timing } from './Timing';

export const Timer = ({
  focusSubject,
  onTimerEnd,
  focusHistory,
  clearSubject,
  }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(5);
  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
  ];

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    reset();
  }
  
  useKeepAwake();
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.countdownBox}>
        <Countdown minutes={minutes} isPaused={!isStarted} onEnd={onEnd} onProgress={(progress) => setProgress(progress)} onTimerEnd={(addSubject) => onTimerEnd(addSubject)} focusSubject={focusSubject} focusHistory={focusHistory}/>
      </View>
      <View>
        <Text style={styles.text}>
          Tarefa atual:
        </Text>
        <Text style={styles.task}>
          {focusSubject}
        </Text>
      </View>
      <ProgressBar style={styles.progressBar} progress={progress}/>
      <Timing onChangeTime={setMinutes}/>
      <View style={styles.buttonWrapper}>
        {!isStarted && ( 
          <RoundedButton title="start" size={100} onPress={() => setIsStarted(true)}/>)} 
        {isStarted &&  (<RoundedButton title="pause" size={100} onPress={() => setIsStarted(false)}/>)}
      </View>
      <View style={styles.homeButton}>
        <RoundedButton title = "X" size={50} onPress={clearSubject}/>
      </View>
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdownBox: {
    backgroundColor: colors.countdownBox,
    width: (windowWidth / 4) * 2.5,
    height: (windowHeight / 8),
    marginHorizontal: 75,
    marginVertical: 40,
  },
  text: {
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
  buttonWrapper: {
    flex: 0.5,
    alignItems: 'center',
  },
  progressBar: {
    backgroundColor: colors.progressBar,
    marginTop: 20,
    height: 10,
  },
  homeButton: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  }
})
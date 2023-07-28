import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { colors } from './src/utils/colors';
import { Focus } from './src/features/Focus';
import { Timer } from './src/features/Timer';

function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <Focus addSubject={setCurrentSubject} focusHistory={focusHistory}></Focus>
      ) : (
        <Timer
        focusSubject = {currentSubject}
        focusHistory = {focusHistory}
        onTimerEnd = {setFocusHistory}
        clearSubject = {() => setCurrentSubject(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.darkBlue,
  },
});

export default App;

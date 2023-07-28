import React, {useState, useEffect} from 'react';
import { Text, StyleSheet} from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (min) => min * 60000; // transforma minutos em millisegundos
const formatTime = (time) => (time < 10 ? `0${time}` : time); // o format vai formatar o segundos de modo que o primeiro numero continue em 0 em o segundo decresça quando o time < 10

export const Countdown = ({minutes, isPaused, onProgress, onEnd, onTimerEnd, focusSubject, focusHistory}) => {
  const interval = React.useRef(null); // o useRef n re-renderiza diferente do useState

  const[millis, setMillis] = useState(null);

  const reset = () => setMillis(minutesToMillis(minutes)); // o props minutes nessa funcao eh usado apenas para calcular os millisegundos, ou seja, ele n influencia diretamente no tempo que aparece na interface e sim os millisegundos no calculo da const minute e const second que devem aparecer na interface

  function addItem() {
    const newItem = focusSubject;
    const newItems = [...focusHistory, '-', newItem, '\n'];
    onTimerEnd(newItems);
  }

  const countDown = () => {
    setMillis((time) => { // o estado atual do tempo eh sempre atualizado com o setMillis, que vem do useState hook
      if (time == 0) {
        addItem();
        clearInterval(interval.current);
        onEnd(reset);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
  }, [millis]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if(interval.current)
        clearInterval(interval.current);
        return;
    }
    
    interval.current = setInterval(countDown, 1000); // o setInterval diz que eh pra chamar o primeiro parametro(no caso a funcao countDown) a cada certo tempo, no caso 1s

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return(
    <Text style={styles.text}>
    {formatTime(minute)} : {formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.sm,
    textAlign: 'center',
    backgroundColor: 'rgba(94, 132, 226, 0.3',
  },
});
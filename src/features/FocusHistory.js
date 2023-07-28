import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { colors } from '../utils/colors';

export const FocusHistory = ({ addFocusHistory }) => {
  // eu poderia ter usado também o FlatList Component do react native para imprimir os itens do vetor
  function print() {
    return addFocusHistory;
  }

  if (addFocusHistory == undefined || addFocusHistory.length === 0)
    return <Text style={styles.anyTaskCompleted}> Nenhuma tarefa concluída!</Text>

  return(
    <View style={styles.container}>
      <Text style={styles.title}>
        Tarefas concluídas:
      </Text>
      <Text style={styles.tasks}>
        {print()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
  tasks: {
    color: colors.white,
    marginHorizontal: 10,
    fontSize: 15,
    marginTop: 5,
  },
  anyTaskCompleted: {
    color: colors.white,
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
})
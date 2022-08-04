import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, FlatList, Button, Modal, Image} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [modalIsVisible, setModaIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals,
      {text: enteredGoalText, id: Math.random().toString()},
    ]);
    endAddGoalHandler();
  };

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
        return currentCourseGoals.filter((goals)=> goals.id !==id);
    });
  }
  
  function startAddGoallHandler(){
    setModaIsVisible(true);
  }

  function endAddGoalHandler(){
    setModaIsVisible(false);
  }


  return (
    <View style={styles.appContainer}>
      <Button title='Add New Goal' color='#5e0acc' onPress={startAddGoallHandler}/>
      <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler}/>
      <View style={styles.goalsContainer}>
        <FlatList 
           data={courseGoals} 
           renderItem={(itemData) => {
           return <GoalItem id={itemData.item.id} text={itemData.item.text} onDeleteItem={deleteGoalHandler}/>;
        }} 
        keyExtractor={(item, index) => {
           return item.id;
        }}
        alwaysBounceVertical={false}></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#6d57ea',
  },
  goalsContainer: {
    flex: 4,
  },
 
});

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Checkbox, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DailyTasksScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Morning Stretching',
      time: '6:00 AM',
      description: 'Complete 15 minutes of full-body stretching',
      completed: false,
    },
    {
      id: 2,
      title: 'Breakfast',
      time: '7:00 AM',
      description: 'Eat a protein-rich breakfast with growth-supporting nutrients',
      completed: false,
    },
    {
      id: 3,
      title: 'Midday Exercise',
      time: '12:00 PM',
      description: 'Perform growth-stimulating exercises for 30 minutes',
      completed: false,
    },
    {
      id: 4,
      title: 'Afternoon Snack',
      time: '3:00 PM',
      description: 'Have a healthy snack with calcium and vitamin D',
      completed: false,
    },
    {
      id: 5,
      title: 'Evening Workout',
      time: '6:00 PM',
      description: 'Complete your daily workout routine',
      completed: false,
    },
    {
      id: 6,
      title: 'Sleep Preparation',
      time: '9:00 PM',
      description: 'Follow sleep hygiene practices for optimal growth',
      completed: false,
    },
  ]);

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Protocol</Text>
          <Text style={styles.subtitle}>Complete your daily tasks for optimal growth</Text>
        </View>

        <Card style={styles.progressCard}>
          <Card.Content>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Today's Progress</Text>
              <Text style={styles.progressText}>{Math.round(progress)}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressSubtext}>
              {completedTasks} of {tasks.length} tasks completed
            </Text>
          </Card.Content>
        </Card>

        {tasks.map(task => (
          <Card key={task.id} style={styles.taskCard}>
            <Card.Content style={styles.taskContent}>
              <View style={styles.taskHeader}>
                <Checkbox
                  status={task.completed ? 'checked' : 'unchecked'}
                  onPress={() => toggleTask(task.id)}
                  color={theme.colors.primary}
                />
                <View style={styles.taskInfo}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskTime}>{task.time}</Text>
                </View>
              </View>
              <Text style={styles.taskDescription}>{task.description}</Text>
            </Card.Content>
          </Card>
        ))}

        <Button
          mode="contained"
          onPress={() => navigation.navigate('Progress')}
          style={styles.button}
          icon="trending-up"
        >
          Track Progress
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  progressCard: {
    marginBottom: 24,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6200ee',
    borderRadius: 4,
  },
  progressSubtext: {
    fontSize: 14,
    color: '#666',
  },
  taskCard: {
    marginBottom: 16,
    elevation: 2,
  },
  taskContent: {
    padding: 8,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskInfo: {
    marginLeft: 8,
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  taskTime: {
    fontSize: 14,
    color: '#666',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 40,
  },
  button: {
    marginTop: 16,
    marginBottom: 32,
  },
});

export default DailyTasksScreen; 
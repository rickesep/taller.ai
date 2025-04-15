import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const ProgramScreen = ({ navigation }: any) => {
  const theme = useTheme();

  const programOptions = [
    {
      id: 'daily',
      title: 'Daily Protocol',
      icon: 'schedule',
      description: 'Your daily growth routine and tasks',
      color: '#6200ee',
    },
    {
      id: 'weekly',
      title: 'Weekly Program',
      icon: 'calendar-today',
      description: 'Weekly growth activities and schedule',
      color: '#03dac6',
    },
    {
      id: 'nutrition',
      title: 'Nutrition Plan',
      icon: 'restaurant',
      description: 'Growth-optimizing diet and supplements',
      color: '#ff4081',
    },
    {
      id: 'techniques',
      title: 'Growth Techniques',
      icon: 'fitness-center',
      description: 'Advanced height growth methods',
      color: '#ff9800',
    },
    {
      id: 'progress',
      title: 'Progress Tracking',
      icon: 'trending-up',
      description: 'Track your growth journey',
      color: '#4caf50',
    },
    {
      id: 'support',
      title: 'Expert Support',
      icon: 'support',
      description: 'Get help from our experts',
      color: '#2196f3',
    },
  ];

  const handleOptionPress = (id: string) => {
    navigation.navigate(id.charAt(0).toUpperCase() + id.slice(1));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Growth Program</Text>
          <Text style={styles.subtitle}>Choose a section to get started</Text>
        </View>

        <View style={styles.grid}>
          {programOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => handleOptionPress(option.id)}
              style={styles.optionContainer}
            >
              <Card style={[styles.optionCard, { backgroundColor: option.color }]}>
                <Card.Content style={styles.optionContent}>
                  <Icon name={option.icon} size={32} color="white" />
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionContainer: {
    width: (width - 48) / 2,
    marginBottom: 16,
  },
  optionCard: {
    height: 180,
    elevation: 4,
  },
  optionContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.9,
  },
});

export default ProgramScreen; 
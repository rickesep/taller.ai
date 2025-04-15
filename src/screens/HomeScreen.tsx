import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Button, Card, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>TallerAI</Text>
          <Text style={styles.subtitle}>Your Personal Height Growth Assistant</Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Start Your Growth Journey</Text>
            <Text style={styles.cardText}>
              Get personalized height growth recommendations based on your current height and age.
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Program')}
              style={styles.button}
            >
              Start Now
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content>
              <Text style={styles.statNumber}>98%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content>
              <Text style={styles.statNumber}>10k+</Text>
              <Text style={styles.statLabel}>Active Users</Text>
            </Card.Content>
          </Card>
        </View>

        <Card style={styles.featuresCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>What You'll Get</Text>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>• Daily Growth Protocol</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>• Weekly Program</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>• Nutrition Plan</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>• Growth Techniques</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureText}>• Progress Tracking</Text>
            </View>
          </Card.Content>
        </Card>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    marginBottom: 24,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: (width - 48) / 2,
    elevation: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  featuresCard: {
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  featureItem: {
    marginBottom: 8,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HomeScreen; 
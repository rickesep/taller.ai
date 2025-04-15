import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Avatar, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Avatar.Text
            size={80}
            label="JD"
            style={styles.avatar}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.memberSince}>Member since January 2024</Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Your Stats</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>175 cm</Text>
                <Text style={styles.statLabel}>Current Height</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>180 cm</Text>
                <Text style={styles.statLabel}>Target Height</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>30</Text>
                <Text style={styles.statLabel}>Days Active</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            <Button
              mode="outlined"
              onPress={() => {}}
              style={styles.button}
              icon="account-edit"
            >
              Edit Profile
            </Button>
            <Button
              mode="outlined"
              onPress={() => {}}
              style={styles.button}
              icon="bell"
            >
              Notifications
            </Button>
            <Button
              mode="outlined"
              onPress={() => {}}
              style={styles.button}
              icon="help-circle"
            >
              Help & Support
            </Button>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={() => {}}
          style={styles.logoutButton}
          icon="logout"
        >
          Log Out
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
  avatar: {
    backgroundColor: '#6200ee',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    marginBottom: 24,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  button: {
    marginBottom: 8,
  },
  logoutButton: {
    marginTop: 16,
    marginBottom: 32,
    backgroundColor: '#ff4444',
  },
});

export default ProfileScreen; 
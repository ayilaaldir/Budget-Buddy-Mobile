import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const App = () => {
  const [activeTab, setActiveTab] = useState('Calendar');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Calendar':
        return <CalendarView />;
      case 'Monthly':
        return <MonthlyView />;
      case 'Notes':
        return <NotesView />;
      default:
        return <CalendarView />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {['Calendar', 'Monthly', 'Notes'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {renderTabContent()}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2024-05-01'));
  const [items, setItems] = useState({
    '2024-05-08': { income: '0.00', expenses: '0.00' },
    '2024-05-10': { income: '20.00', expenses: '5.00' },
  });

  const renderCalendar = () => {
    const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const totalDays = endOfMonth.getDate();

    let days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayContainer} />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const item = items[dateStr];

      days.push(
        <TouchableOpacity key={day} style={styles.dayContainer} onPress={() => console.log(`Selected day: ${dateStr}`)}>
          <Text>{day}</Text>
          {item && (
            <View>
              <Text style={styles.income}>{item.income}</Text>
              <Text style={styles.expenses}>{item.expenses}</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.daysOfWeekContainer}>
        {daysOfWeek.map((day, index) => (
          <Text key={index} style={styles.dayOfWeekText}>{day}</Text>
        ))}
      </View>
      <View style={styles.calendarGrid}>
        {renderCalendar()}
      </View>
    </View>
  );
};

const MonthlyView = () => (
  <View style={styles.contentContainer}>
    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'].map((month, index) => (
      <View key={index} style={styles.monthlyRow}>
        <Text>{month}</Text>
        <Text style={styles.income}>0.00</Text>
        <Text style={styles.expenses}>0.00</Text>
      </View>
    ))}
  </View>
);

const NotesView = () => (
  <ScrollView style={styles.contentContainer}>
    {Array(3).fill(null).map((_, index) => (
      <View key={index} style={styles.noteCard}>
        <Text style={styles.noteDate}>dd.mm (day)</Text>
        <Text style={styles.noteTitle}>Title</Text>
        <Text style={styles.noteContent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        </Text>
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: '#fff', marginTop: 30 },
  tab: { paddingVertical: 10 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#007BFF' },
  tabText: { fontSize: 16, color: '#007BFF' },
  contentContainer: { flex: 1, padding: 20 },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  monthText: { fontSize: 16, color: '#007BFF' },
  daysOfWeekContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  dayOfWeekText: { fontSize: 14, color: '#000' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayContainer: { width: '14.28%', height: 60, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#ccc' },
  income: { color: 'green', fontSize: 12 },
  expenses: { color: 'red', fontSize: 12 },
  monthlyRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  noteCard: { backgroundColor: '#fff', padding: 20, marginBottom: 10, borderRadius: 5 },
  noteDate: { fontSize: 12, color: '#aaa' },
  noteTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 5 },
  noteContent: { fontSize: 14, color: '#333' },
  addButton: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#007BFF', padding: 15, borderRadius: 50 },
});

export default App;

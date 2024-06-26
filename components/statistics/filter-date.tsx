import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface Props {
  selectedYearTo: number;
  setSelectedYearTo: (year: number) => void;
  selectedMonthTo: number;
  setSelectedMonthTo: (month: number) => void;
  onApply: () => void;
}

const FilterStatisticsDate: React.FC<Props> = ({ selectedYearTo, setSelectedYearTo, selectedMonthTo, setSelectedMonthTo, onApply }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(20), (val, index) => currentYear - index);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filter Date</Text>
      <RNPickerSelect
        placeholder={{ label: "Select year", value: null }}
        value={selectedYearTo}
        onValueChange={(value) => setSelectedYearTo(value)}
        items={years.map(year => ({ label: String(year), value: year }))}
        style={pickerSelectStyles}
      />
      <RNPickerSelect
        placeholder={{ label: "Select month", value: null }}
        value={selectedMonthTo}
        onValueChange={(value) => setSelectedMonthTo(value)}
        items={months.map((month, index) => ({ label: month, value: index }))}
        style={pickerSelectStyles}
      />
      <Button title="Apply" onPress={onApply} color="#007BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
};

export default FilterStatisticsDate;

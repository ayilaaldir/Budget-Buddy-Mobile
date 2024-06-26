import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FinancialActivityItems from "@/components/statistics/items";
import FinancialActivityGroups from '@/components/statistics/group';
import FilterStatisticsDate from '@/components/statistics/filter-date';

interface FinancialActivityItem {
  amount: number;
  note: string;
  category: string;
  type: 'in' | 'out';
}

interface FinancialActivityDay {
  date: string;
  datas: FinancialActivityItem[];
}

interface FinancialActivityData {
  year: number;
  months: string;
  days: FinancialActivityDay[];
}

const StatisticsComponent = () => {
  const [data, setData] = useState<FinancialActivityData | null>(null);
  const [selectedYearTo, setSelectedYearTo] = useState(new Date().getFullYear());
  const [selectedMonthTo, setSelectedMonthTo] = useState(new Date().getMonth());
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const user_id = await AsyncStorage.getItem('userID');
      console.log(user_id, selectedMonthTo, selectedYearTo);
      const url = `http://141.147.151.192:8080/get_transaction.php?year=${selectedYearTo}&month=${selectedMonthTo + 1}&user_id=${user_id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const fetchedData: FinancialActivityData = await response.json();
      setData(fetchedData);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    let newTotalIncome = 0;
    let newTotalExpenses = 0;
    if (data) {
      data.days.forEach(day => {
        day.datas.forEach(item => {
          if (item.type === 'in') {
            newTotalIncome += item.amount;
          } else {
            newTotalExpenses += item.amount;
          }
        });
      });
      setTotalIncome(newTotalIncome);
      setTotalExpenses(newTotalExpenses);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [selectedYearTo, selectedMonthTo]);

  return (
    <View style={styles.container}>
      <FilterStatisticsDate
        selectedYearTo={selectedYearTo}
        setSelectedYearTo={setSelectedYearTo}
        selectedMonthTo={selectedMonthTo}
        setSelectedMonthTo={setSelectedMonthTo}
        onApply={fetchData}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : data ? (
        data.days.length > 0 ? (
          <FlatList
            data={data.days}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <FinancialActivityGroups
                date={item.date}
                month={data.months}
                year={data.year}
                index={index}
              >
                {item.datas.map((itemData, itemIndex) => (
                  <FinancialActivityItems
                    key={itemIndex}
                    amount={itemData.amount}
                    note={itemData.note}
                    category={itemData.category}
                    type={itemData.type}
                  />
                ))}
              </FinancialActivityGroups>
            )}
          />
        ) : (
          <Text>No data available.</Text>
        )
      ) : (
        <Text>Loading data...</Text>
      )}
      <View style={styles.summaryContainer}>
        <Text style={styles.label}>Total Income</Text>
        <Text style={styles.income}>Rp {totalIncome.toLocaleString()}</Text>
        <Text style={styles.label}>Total Expenses</Text>
        <Text style={styles.expenses}>Rp {totalExpenses.toLocaleString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  summaryContainer: {
    marginTop: 20,
  },
  label: {
    color: 'gray',
    fontSize: 16,
  },
  income: {
    fontSize: 24,
    color: 'green',
  },
  expenses: {
    fontSize: 24,
    color: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default StatisticsComponent;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import FinancialActivityItems from "@/components/statistics/items";  // Update paths as necessary
import FinancialActivityGroups from '@/components/statistics/group';  // Update paths as necessary
import { enableLegacyWebImplementation } from 'react-native-gesture-handler';
//import FilterStatisticsDate from '@/components/statistics/FilterDate';  // Update paths as necessary, ensure mobile compatibility

interface GrandChildData {
    amount: number;
    note: string;
    category: string;
    type: string;
}

interface ChildData {
    date: string;
    datas: GrandChildData[];
}

interface MotherData {
    months: string;
    year: number;
    days: ChildData[];
}

const FinancialActivityComponent = () => {
    const [data, setData] = useState<MotherData | null>(null);
    const year = 2024;
    const month = 6;
    const userId = 1;
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);

    useEffect(() => {
        const url = `http://141.147.151.192:8080/get_transaction.php?year=${year}&month=${month}&user_id=${userId}`;
        fetch(url)
            .then(response => response.json())
            .then((fetchedData: MotherData) => setData(fetchedData))
            .catch(error => console.error('There was an error fetching the data:', error));
    }, []);

    useEffect(() => {
        let newTotalIncome = 0;
        let newTotalExpenses = 0;
        if (data) {
            data.days.forEach(day => {
                day.datas.forEach(item => {
                    if (item.type === 'in') {
                        newTotalIncome += item.amount;
                    }else{
                        newTotalExpenses += item.amount
                    }
                });
            });
            setTotalIncome(newTotalIncome);
            setTotalExpenses(newTotalExpenses);
        }
    }, [data]);

    return (
        <ScrollView style={styles.container}>
            {data ? (
                data.days.map((day, index) => (
                    <FinancialActivityGroups date={day.date} month={data.months} year={data.year} index={index} key={index}>
                        {day.datas.map((item, itemIndex) => (
                            <FinancialActivityItems key={itemIndex} amount={item.amount} note={item.note} category={item.category} type={item.type} />
                        ))}
                    </FinancialActivityGroups>
                ))
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
            <View style={styles.totalIncomeContainer}>
                <Text style={styles.totalText}>Total Income</Text>
                <Text style={styles.totalAmount}>Rp {totalIncome.toLocaleString()}</Text>
            </View>
            <View style={styles.totalExpensesContainer}>
                <Text style={styles.totalText}>Total Expenses</Text>
                <Text style={styles.totalAmount}>Rp {totalExpenses.toLocaleString()}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    totalIncomeContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
    },

    totalExpensesContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },

    totalText: {
        color: 'white',
    },
    totalAmount: {
        fontSize: 22,
        color: 'white',
    },
});

export default FinancialActivityComponent;

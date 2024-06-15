import React from 'react';
import { Text, View } from 'react-native'; // Assuming 'Stack' should be 'View' for layout purposes

interface FinancialActivityGroupsProps {
    date: string;
    month: string;
    year: number;
    children: React.ReactNode;
    index: number;
}

const FinancialActivityGroups: React.FC<FinancialActivityGroupsProps> = ({ date, month, year, children, index }) => {
    return (
        <View key={`${date}-${month}-${year}-${index}`} style={{ margin: 4 }}>
            <Text style={{ paddingLeft: 2 }}>{`${date} ${month} ${year}`}</Text>
            <View>{children}</View>
        </View>
    );
};

export default FinancialActivityGroups;

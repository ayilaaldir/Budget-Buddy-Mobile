import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

interface Props {
    amount: number;
    note: string;
    category: string;
    type: string;
}

const FinancialActivityItems: React.FC<Props> = ({ amount, note, category, type }) => {
    const formatIDR = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(amount);

    return (
        <TouchableOpacity
            style={[
                styles.item,
                { backgroundColor: type === 'in' ? '#d0e8d0' : '#f8d7da' }
            ]}
            onPress={() => {}}
        >
            <View style={styles.content}>
                <Text style={styles.sign}>{type === 'in' ? '+' : '-'}</Text>
                <View style={styles.details}>
                    <Text style={styles.amount}>{formatIDR}</Text>
                    <Text style={styles.note}>{note || category}</Text>
                </View>
            </View>
            <View style={[styles.badge, { backgroundColor: type === 'in' ? '#28a745' : '#dc3545' }]}>
                <Text style={styles.badgeText}>{category}</Text>
            </View>
        </TouchableOpacity>
    );
};

interface Styles {
    item: ViewStyle;
    content: ViewStyle;
    sign: TextStyle;
    details: ViewStyle;
    amount: TextStyle;
    note: TextStyle;
    badge: ViewStyle;
    badgeText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sign: {
        fontSize: 24,
        marginRight: 10,
    },
    details: {
        justifyContent: 'center',
    },
    amount: {
        fontWeight: 'bold',
    },
    note: {
        fontStyle: 'italic',
        color: '#888',
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        color: 'white',
        textTransform: 'capitalize',
    }
});

export default FinancialActivityItems;

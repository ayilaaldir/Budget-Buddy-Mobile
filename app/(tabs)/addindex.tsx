import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

const addIncomeSchema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  amount: Yup.number().required('Amount is required').positive(),
  category: Yup.string().required('Category is required'),
  inout: Yup.string().required('This field is required'),
  note: Yup.string(),
});

const categories = [
  { value: '1', label: "Groceries" },
  { value: '2', label: "Entertainment" },
  { value: '3', label: "Utilities" },
  { value: '4', label: "Transportation" },
  { value: '5', label: "Salary" },
];

const inout = [
  { value: "in", label: "Income" },
  { value: "out", label: "Expenses" },
];

const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

export default function TransactionForm() {
  const [userID, setUserID] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    setLoading(true);
    const userID = Number(await AsyncStorage.getItem('userID'));
    const username = await AsyncStorage.getItem('username');
    if (!userID || !username) {
      Alert.alert(
        "Login Required",
        "You need to log in to access this page.",
        [{ text: "OK", onPress: () => setLoading(false) }]
      );
    } else {
      setUserID(userID);
      setUsername(username);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!userID || !username) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>You need to log in to access this page.</Text>
        <TouchableOpacity onPress={fetchUserData} style={styles.refreshButton}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={addIncomeSchema}
        initialValues={{
          date: getFormattedDate(),
          amount: '',
          category: '',
          inout: '',
          note: '',
        }}
        onSubmit={(values) => {
          fetch('http://141.147.151.192:8080/add_transaction.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `category_id=${encodeURIComponent(values.category)}&user_id=${encodeURIComponent(userID)}&amount=${encodeURIComponent(values.amount)}&transaction_date=${encodeURIComponent(values.date)}&description=${encodeURIComponent(values.note)}&in_out=${encodeURIComponent(values.inout)}`,
          })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') {
              console.log("Transaction added successfully");
            } else {
              console.log("Error adding transaction");
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View>
            <Text style={styles.errorText}>When sign out please Refresh.</Text>
            <TouchableOpacity onPress={fetchUserData} style={styles.refreshButton}>
                <Text style={styles.buttonText}>Refresh</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                onChangeText={handleChange('date')}
                value={values.date}
                placeholder={`Date (Today: ${getFormattedDate()})`}
                placeholderTextColor="#ccc"
            />

            {errors.date && touched.date && <Text style={styles.error}>{errors.date}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('amount')}
              value={values.amount}
              keyboardType="numeric"
              placeholder="Amount"
              placeholderTextColor="#ccc"
            />
            {errors.amount && touched.amount && <Text style={styles.error}>{errors.amount}</Text>}

            <RNPickerSelect
              onValueChange={handleChange('category')}
              items={categories.map(item => ({ label: item.label, value: item.value }))}
              placeholder={{ label: "Select Category", value: null }}
              style={pickerSelectStyles}
            />
            {errors.category && touched.category && <Text style={styles.error}>{errors.category}</Text>}

            <RNPickerSelect
              onValueChange={handleChange('inout')}
              items={inout.map(item => ({ label: item.label, value: item.value }))}
              placeholder={{ label: "Select Income or Expenses", value: null }}
              style={pickerSelectStyles}
            />
            {errors.inout && touched.inout && <Text style={styles.error}>{errors.inout}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('note')}
              value={values.note}
              placeholder="Note"
              placeholderTextColor="#ccc"
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: 150,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: 300,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: 300,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

const pickerSelectStyles = StyleSheet.create({
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
    width: 300,
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
    width: 300,
    backgroundColor: '#fff',
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, TouchableHighlight, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function FinanceScreen() {
  // Your code for the FinanceScreen component
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [note, setNote] = useState('');

  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const [isFromAccountModalVisible, setFromAccountModalVisible] = useState(false);
  const [isToAccountModalVisible, setToAccountModalVisible] = useState(false);

  const [selectedTab, setSelectedTab] = useState('Income');

  const incomeCategories = ['Allowance', 'Salary', 'Petty Cash', 'Bonus', 'Other'];
  const expenseCategories = ['Food', 'Social Life', 'Pets', 'Transport', 'Culture', 'Household', 'Apparel', 'Beauty', 'Education', 'Gift', 'Other'];
  const accounts = ['Cash', 'Account', 'Card'];

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const renderForm = () => {
    switch (selectedTab) {
      case 'Income':
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.input}>{formattedDate}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="-----"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Category</Text>
              <TouchableOpacity onPress={() => setCategoryModalVisible(true)}>
                <Text style={styles.input}>{category || '-----'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Account</Text>
              <TouchableOpacity onPress={() => setAccountModalVisible(true)}>
                <Text style={styles.input}>{account || '-----'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Note</Text>
              <TextInput
                style={styles.input}
                value={note}
                onChangeText={setNote}
              />
            </View>
          </>
        );
      case 'Expense':
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.input}>{formattedDate}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="-----"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Category</Text>
              <TouchableOpacity onPress={() => setCategoryModalVisible(true)}>
                <Text style={styles.input}>{category || '-----'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Account</Text>
              <TouchableOpacity onPress={() => setAccountModalVisible(true)}>
                <Text style={styles.input}>{account || '-----'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Note</Text>
              <TextInput
                style={styles.input}
                value={note}
                onChangeText={setNote}
              />
            </View>
          </>
        );
      case 'Transfer':
        return (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.input}>{formattedDate}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="-----"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>From</Text>
              <TouchableOpacity onPress={() => setFromAccountModalVisible(true)}>
                <Text style={styles.input}>{fromAccount || '-----'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>To</Text>
              <TouchableOpacity onPress={() => setToAccountModalVisible(true)}>
                <Text style={styles.input}>{toAccount || '-----'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Note</Text>
              <TextInput
                style={styles.input}
                value={note}
                onChangeText={setNote}
              />
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backButton}>{"< Back"}</Text>
        </TouchableOpacity>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setSelectedTab('Income')}>
            <View style={[styles.tab, selectedTab === 'Income' && styles.activeTab]}>
              <Text style={[styles.tabText, selectedTab === 'Income' && styles.activeTabText]}>Income</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab('Expense')}>
            <View style={[styles.tab, selectedTab === 'Expense' && styles.activeTab]}>
              <Text style={[styles.tabText, selectedTab === 'Expense' && styles.activeTabText]}>Expense</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab('Transfer')}>
            <View style={[styles.tab, selectedTab === 'Transfer' && styles.activeTab]}>
              <Text style={[styles.tabText, selectedTab === 'Transfer' && styles.activeTabText]}>Transfer</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        {renderForm()}
      </ScrollView>

      {/* Category Modal */}
      <Modal
        transparent={true}
        visible={isCategoryModalVisible}
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.categoryLabel}>Category</Text>
            <ScrollView contentContainerStyle={styles.gridContainer}>
              {(selectedTab === 'Income' ? incomeCategories : expenseCategories).map((item, index) => (
                <TouchableHighlight
                  key={index}
                  style={styles.gridItem}
                  onPress={() => {
                    setCategory(item);
                    setCategoryModalVisible(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableHighlight>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Account Modal */}
      <Modal
        transparent={true}
        visible={isAccountModalVisible}
        onRequestClose={() => setAccountModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.categoryLabel}>Account</Text>
            <ScrollView contentContainerStyle={styles.gridContainer}>
              {accounts.map((item, index) => (
                <TouchableHighlight
                  key={index}
                  style={styles.gridItem}
                  onPress={() => {
                    setAccount(item);
                    setAccountModalVisible(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableHighlight>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* From Account Modal */}
      <Modal
        transparent={true}
        visible={isFromAccountModalVisible}
        onRequestClose={() => setFromAccountModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.categoryLabel}>From Account</Text>
            <ScrollView contentContainerStyle={styles.gridContainer}>
              {accounts.map((item, index) => (
                <TouchableHighlight
                  key={index}
                  style={styles.gridItem}
                  onPress={() => {
                    setFromAccount(item);
                    setFromAccountModalVisible(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableHighlight>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* To Account Modal */}
      <Modal
        transparent={true}
        visible={isToAccountModalVisible}
        onRequestClose={() => setToAccountModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.categoryLabel}>To Account</Text>
            <ScrollView contentContainerStyle={styles.gridContainer}>
              {accounts.map((item, index) => (
                <TouchableHighlight
                  key={index}
                  style={styles.gridItem}
                  onPress={() => {
                    setToAccount(item);
                    setToAccountModalVisible(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableHighlight>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 25,
  },
  backButton: {
    marginRight: 20,
    color: '#007BFF',
  },
  tabContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  tab: {
    padding: 10,
  },
  tabText: {
    color: '#007BFF',
  },
  activeTab: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    padding: 10,
  },
  activeTabText: {
    color: '#000',
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  categoryLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
  },
  gridContainer: {
    flexDirection: 'column',
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: '30%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerButton: {
    alignItems: 'center',
  },
});

export default FinanceScreen;

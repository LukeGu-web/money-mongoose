import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EditableAccountList from 'components/BankAccount/EditableAccountList';
import AssetGroupModal from 'components/Modal/AssetGroupModal';

export default function Account() {
  const [showModal, setShowModal] = useState(false);
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <EditableAccountList />
      </ScrollView>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={[styles.createBtn, styles.groupBtn]}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.createText}>Add Group</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => router.navigate('/asset/add-bank-account')}
        >
          <Text style={styles.createText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <AssetGroupModal
        name=''
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
      <StatusBar style='light' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  createText: {
    fontWeight: '400',
    color: 'white',
  },
  createBtn: {
    width: '45%',
    backgroundColor: '#ffb703',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  groupBtn: {
    backgroundColor: 'gray',
  },
});

import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, router } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  InputAccessoryView,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, FormProvider } from 'react-hook-form';
import { AntDesign } from '@expo/vector-icons';

import { useStyles, TColors } from 'core/theme';
import { useAccounts } from 'core/stateHooks';
import {
  AssetAccountBasicForm,
  AssetAccountOtherForm,
  AssetCreditForm,
} from 'components';

export default function AddBankAccount() {
  const inputAccessoryViewID = 'uniqueID';
  const { styles, theme } = useStyles(createStyles);
  const addAccount = useAccounts((state) => state.addAccount);
  const [isMore, setIsMore] = useState(false);
  const methods = useForm({
    defaultValues: {
      accountName: '',
      group: '',
      balance: '',
      isCredit: false,
      creditLimit: '',
      repaymentDay: '',
      isTotalAssets: true,
      isNoBudget: false,
      note: '',
    },
  });
  const { getValues, watch } = methods;
  watch(['isCredit']);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsMore(false);
        methods.reset();
      };
    }, [])
  );

  const handleCreate = methods.handleSubmit((data) => {
    console.log(data);
    addAccount(data);
    router.navigate('/asset');
  });

  return (
    //
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAwareScrollView extraScrollHeight={50}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormProvider {...methods}>
            <View style={styles.logoContainer}></View>
            <View>
              <Text style={styles.formHeader}>Basic information</Text>
              <View style={styles.basicContainer}>
                <AssetAccountBasicForm />
              </View>
            </View>
            {getValues('isCredit') && (
              <View>
                <Text style={styles.formHeader}>Credit information</Text>
                <View style={{ ...styles.basicContainer, height: 100 }}>
                  <AssetCreditForm />
                </View>
              </View>
            )}
            <View style={{ flex: 1 }}>
              {isMore ? (
                <View style={{ flex: 1 }}>
                  <Text style={styles.formHeader}>Other settings</Text>
                  <View style={styles.moreContainer}>
                    <AssetAccountOtherForm />
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.moreBtn}
                  onPress={() => setIsMore(true)}
                >
                  <Text style={{ color: theme.secondary }}>More settings</Text>
                  <AntDesign name='down' size={18} color={theme.secondary} />
                </TouchableOpacity>
              )}
            </View>

            <InputAccessoryView nativeID={inputAccessoryViewID}>
              <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
                <Text style={styles.createText}>Create</Text>
              </TouchableOpacity>
            </InputAccessoryView>
          </FormProvider>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
        <Text style={styles.createText}>Create</Text>
      </TouchableOpacity>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}

const createStyles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
      gap: 6,
      padding: 5,
    },
    logoContainer: {
      height: 100,
      borderRadius: 10,
      backgroundColor: 'skyblue',
    },
    basicContainer: {
      height: 200,
      borderRadius: 10,
      backgroundColor: theme.bgPrimary,
    },
    moreContainer: {
      flex: 1,
      borderRadius: 10,
      backgroundColor: theme.bgPrimary,
    },
    formHeader: {
      fontSize: 12,
      color: 'gray',
    },
    createText: {
      fontWeight: '400',
    },
    moreBtn: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      borderRadius: 8,
    },
    createBtn: {
      width: '100%',
      backgroundColor: 'yellow',
      padding: 8,
      alignItems: 'center',
      borderRadius: 8,
    },
  });

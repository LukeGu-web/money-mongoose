import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useStyles, TColors } from 'core/theme';

export default function AddBankAccount() {
  const { styles } = useStyles(createStyles);
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}></View>
      <View>
        <Text>Basic information</Text>
        <View style={styles.basicContainer}></View>
      </View>
      <View>
        <Text>Other settings</Text>
        <View style={styles.moreContainer}></View>
      </View>
      <StatusBar style='light' />
    </View>
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
      backgroundColor: 'powderblue',
    },
    moreContainer: {
      flex: 1,
      borderRadius: 10,
      backgroundColor: 'green',
    },
  });

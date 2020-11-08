import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../services/api';

const New = (props) => {
  const [newTweet, setNewTweet] = useState('');
  const {navigation} = props;

  const goBack = () => {
    navigation.pop();
  };

  const handleTweet = async () => {
    const content = newTweet;
    const author = await AsyncStorage.getItem('@OmniStack:username');

    await api.post('tweets', {author, content});

    goBack();
  };

  const handleInputChange = (value) => {
    setNewTweet(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Icon name="close" size={24} color="#4bb0ee" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleTweet}>
          <Text style={styles.buttonText}>Tweetar</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        multiline
        placeholder="O que está acontecendo?"
        placeholderTextColor="#999"
        value={newTweet}
        onChangeText={handleInputChange}
        returnKeyType="send"
        onSubmitEditing={handleTweet}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    height: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#4BB0EE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  input: {
    margin: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default New;

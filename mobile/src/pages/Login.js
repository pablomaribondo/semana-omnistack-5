import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const {navigation} = props;

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('@OmniStack:username');
      if (user) {
        navigation.navigate('App');
      }
    })();
  }, []);

  const handleInputChange = (value) => {
    setUsername(value);
  };

  const handleLogin = async () => {
    if (!username.length) {
      return;
    }

    await AsyncStorage.setItem('@OmniStack:username', username);
    navigation.navigate('App');
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.content}>
        <View>
          <Icon name="twitter" size={64} color="#4bb0ee" />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          value={username}
          onChangeText={handleInputChange}
          onSubmitEditing={handleLogin}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: 'stretch',
    marginTop: 30,
  },

  button: {
    height: 44,
    alignSelf: 'stretch',
    marginTop: 10,
    backgroundColor: '#4BB0EE',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;

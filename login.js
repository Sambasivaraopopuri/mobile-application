import React, { useState } from 'react';
import { View,Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Register from './src/register'
import AsyncStorage from '@react-native-async-storage/async-storage';
const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const handleRegister = async ({}) => {
    try {
      const response = await fetch(`http://183.83.33.79:84/login_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
          
        }),
      });
      const data = await response.json();
      if (data.Msg) {

        // Registration successful
         await AsyncStorage.setItem('name', 'John');
        console.log(data)
       navigation.navigate("Home");
        // console.log('Registration successful:', data);
        // Perform additional actions upon successful registration, e.g., navigate to a success screen
      } else {
        // Registration failed
        const errorData = await response.json();
        console.log('Registration failed:', errorData);
        // Perform error handling, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Perform error handling, e.g., display an error message to the user
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Register" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
      <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
        Register here.
      </Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default RegisterScreen;

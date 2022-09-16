import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState("")
  const authCtx = useContext(AuthContext);
  const { token } = authCtx;
  useEffect(() => {
    async function getMessage() {
      const { data } = await axios.get("https://react-native-7929b-default-rtdb.asia-southeast1.firebasedatabase.app/message.json?auth=" + token);
      setFetchedMessage(data)
    }
    getMessage();
  }, [token])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

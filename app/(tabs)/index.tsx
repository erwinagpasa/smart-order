import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
  const status = 'Free';
  const walletCount = 1;
  const userId = 1;

  return (
    <View style={styles.wrapper}>


      <TouchableOpacity onPress={() => router.push({
        pathname: '/modal/signin',
        params: { userId: userId }
      })} className="bg-[#0083FF] py-3 px-6 rounded-md flex flex-row justify-center">
        <Text className="text-center text-white text-base mr-3">Authorize the user</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

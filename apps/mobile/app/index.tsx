import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>MãeTech Conecta</Text>
      <Link href="/home">Go to Home</Link>
    </View>
  );
}

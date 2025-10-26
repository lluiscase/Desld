import { View, StyleSheet, Text } from 'react-native';

export function Login() {
  return (
	<View style={styles.container}>
		<Text>pagina login</Text>
	</View>
  );
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	justifyContent: 'center',
  },
});
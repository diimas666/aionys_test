import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
const MyButton = ({ children, onPress }) => {
  return (
    <View style={styles.buttonOuter}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.buttonInner, pressed && styles.pressed]}
        android_ripple={{ color: 'black' }}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default MyButton;
const styles = StyleSheet.create({
  buttonOuter: {
    borderRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 8,
  },
  buttonInner: {
    backgroundColor: '#4e8ef7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

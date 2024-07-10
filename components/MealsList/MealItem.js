import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const MealItem = ({ id, title, imageUrl, complexity, duration, affordability }) => {
  const navigator = useNavigation()

  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => pressed && Platform.OS === 'ios' ? styles.buttonPressed : null}
        onPress={() => navigator.navigate('MealDetails', {mealId: id})}
        >
        <View style={styles.innerContainer}>
          <View>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.details}>
            <Text>{duration}m</Text>
            <Text>{complexity.toUpperCase()}</Text>
            <Text>{affordability}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export default MealItem

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  buttonPressed: {
    opacity: 0.5
  },
  innerContainer: {
    borderRadius: 8,
    overflow: 'hidden'
  },
  image: {
    /* for ios overflow compatibility */
    width: '100%',
    height: 200,
    objectFit: 'cover'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    textAlign: 'center',
    margin: 8
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8
  }
})

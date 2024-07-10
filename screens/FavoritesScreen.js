import { useContext } from 'react'
import MealsList from '../components/MealsList/MealsList'
import { FavoritesContext } from '../store/context/favorites-context'
import { MEALS } from '../data/data'
import { StyleSheet, Text, View } from 'react-native'

const FavoritesScreen = () => {
  const favoritesMealsCtx = useContext(FavoritesContext)
  const meals = MEALS.filter(meal => favoritesMealsCtx.ids.includes(meal.id))

  if(meals.length === 0){
    return <View style={styles.rootContainer}>
      <Text style={styles.text}>No favorites yet!</Text>
    </View>
  }

  return (
    <MealsList items={meals} />
  )
}

export default FavoritesScreen

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'open-sans-bold',
    fontSize: 18
  }
})
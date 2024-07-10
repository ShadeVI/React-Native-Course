import { Button, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { MEALS } from '../data/data'
import { useContext, useLayoutEffect } from 'react'
import IconButton from '../components/IconButton'
import { FavoritesContext } from '../store/context/favorites-context'

const MealDetailScreen = ({ route, navigation }) => {
  const favoritesMealsCtx = useContext(FavoritesContext)

  const { mealId } = route.params

  const mealDetails = MEALS.find(meal => meal.id === mealId)

  const {
    duration,
    complexity,
    affordability,
    imageUrl,
    title,
    ingredients,
    steps
  } = mealDetails

  const mealIsFavorite = favoritesMealsCtx.ids.includes(mealId)

  const changeFavoriteStatusHandler = () => {
    mealIsFavorite ? favoritesMealsCtx.removeFavorite(mealId) : favoritesMealsCtx.addFavorite(mealId)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerRight: () => {
        return (<IconButton icon={mealIsFavorite ? 'star' : 'star-outline'} onTap={changeFavoriteStatusHandler} color='white' />)
      }
    })
  }, [navigation, changeFavoriteStatusHandler])

  return (
    <ScrollView>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.detailText}>{duration}m</Text>
        <Text style={styles.detailText}>{complexity.toUpperCase()}</Text>
        <Text style={styles.detailText}>{affordability}</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Ingredients</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList scrollEnabled={false} data={ingredients} renderItem={({ item, index }) => {
          return <View style={styles.listLine}>
            <Text style={styles.listLineText} key={index}>{item}</Text>
          </View>
        }} />

      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Steps</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList scrollEnabled={false} data={steps} renderItem={({ item, index }) => {
          return <View style={styles.listLine}>
            <Text style={styles.listLineText} key={index}>{item}</Text>
          </View>
        }} />

      </View>
    </ScrollView>
  )
}

export default MealDetailScreen

const styles = StyleSheet.create({
  image: {
    /* for ios overflow compatibility */
    width: '100%',
    height: 350,
    objectFit: 'cover'
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8
  },
  detailText: {
    fontSize: 18,
    color: '#ccc'
  },
  subtitle: {
    color: '#e2b497',
    fontSize: 20,
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
  },
  subtitleContainer: {
    padding: 8,
    marginHorizontal: 24,
    marginVertical: 4,
    borderBottomColor: '#e2b497',
    borderBottomWidth: 2
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listLine: {
    marginVertical: 4,
    marginHorizontal: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontFamily: 'open-sans',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listLineText: {
    color: "#ccc"
  }
})
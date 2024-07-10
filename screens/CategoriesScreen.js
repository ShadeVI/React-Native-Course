import { View, Text, FlatList } from 'react-native'

import { CATEGORIES } from '../data/data'
import CategoryGridTile from '../components/CategoryGridTile'

const renderCategoryItem = ({itemData, navigation}) => {

  const onPressHandler = () => {
    navigation.navigate('MealsOverview', {
      categoryId: itemData.item.id,
      
    })
  }

  return (
    <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onPress={onPressHandler} />
  )
}

const CategoriesScreen = ({navigation}) => {

  return (
    <FlatList data={CATEGORIES} keyExtractor={(item) => item.id} renderItem={(itemData) => renderCategoryItem({itemData, navigation})} numColumns={2}/>
  )
}

export default CategoriesScreen
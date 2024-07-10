import { useLayoutEffect } from "react";

import { CATEGORIES, MEALS } from "../data/data";
import MealsList from "./MealsList/MealsList";

const MealsOverviewScreen = ({ route, navigation }) => {
  const { categoryId } = route.params;

  const displayedMeals = MEALS.filter(meal => meal.categoryIds.includes(categoryId))

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((category) => category.id === categoryId).title

    navigation.setOptions({
      title: categoryTitle,
    })
  }, [categoryId, navigation])

  return <MealsList items={displayedMeals} />
};

export default MealsOverviewScreen;

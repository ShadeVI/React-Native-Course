import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => null,
  removeFavorite: (id) => null
})

const FavoritesContextProvider = ({children}) => {
  const [favIds, setIds] = useState([])
  
  const addFavorite = (id) => {
    setIds((prevIds) => [...prevIds, id])
  }
  
  const removeFavorite = (id) => {
    setIds((prevIds) => prevIds.filter((mealId) => mealId !== id))
  }

  return <FavoritesContext.Provider value={{
    ids: favIds,
    addFavorite,
    removeFavorite
  }}>
    {children}
  </FavoritesContext.Provider>
}

export default FavoritesContextProvider
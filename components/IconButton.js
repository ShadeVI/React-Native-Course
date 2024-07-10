import { Pressable, StyleSheet } from 'react-native'
import { Ionicons } from "@expo/vector-icons"

const IconButton = ({onTap, icon, color}) => {
  return (
    <Pressable onPress={onTap} style={({pressed}) => pressed && styles.pressed}>
      <Ionicons name={icon} size={24} color={color} />
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7
  }
})
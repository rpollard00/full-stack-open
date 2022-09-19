import { StyleSheet, Text as NativeText, View } from 'react-native'

import theme from '../theme'

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.textPrimary,
  },
  colorTextLight: {
    color: theme.colors.textLight,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  tag: {
    view: {
      backgroundColor: theme.colors.primary,
      padding: 8,
      alignSelf: 'flex-start',
      borderRadius: 8,
      margin: 6,
      marginLeft: 60,
    },
    content: {
      fontWeight: theme.fontWeights.bold,
      color: theme.colors.textLight,
    },
  },
})

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'textLight' && styles.colorTextLight,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ]

  return <NativeText style={textStyle} {...props} />
}

export const Tag = ({ textContent, ...props }) => {
  return (
    <View style={styles.tag.view}>
      <Text style={styles.tag.content}>{textContent}</Text>
    </View>
  )
}

export const Subheading = ({ ...props }) => {
  return (
    <Text
      fontSize="subheading"
      color="textSecondary"
      fontWeight="bold"
      {...props}
    />
  )
}

export default Text

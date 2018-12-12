import { getFontSize } from '../utils/responsive'

const theme = {
  colors: {
    gray: '#555555',
    blue: '#3333EE',
    black: '#000000',
    white: '#FFFFFF',
    lightgray: '#CECECE',
    darkgray: '#ABABAB',
    red: '#EE3333',
    green: '#33FF33'
  },
  FONT_SIZE_SMALL: getFontSize(12),
  FONT_SIZE_MEDIUM: getFontSize(16),
  FONT_SIZE_LARGE: getFontSize(20),
  FONT_WEIGHT_LIGHT: '200',
  FONT_WEIGHT_MEDIUM: '500',
  FONT_WEIGHT_BOLD: '700',
};

export default theme;

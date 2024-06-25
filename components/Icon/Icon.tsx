import { createIconSetFromFontello } from '@expo/vector-icons';
import fontelloConfig from 'assets/config.json';

const Icon = createIconSetFromFontello(
  fontelloConfig,
  'fontello',
  'fontello.ttf'
);

export default Icon;

//직접 만든 svg 아이콘들을 fontello를 사용하여 컴포넌트화 하였다.

import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from './Icon-font.json';
const Icon = createIconSetFromFontello(fontelloConfig, 'amorlangicon');
export default Icon;

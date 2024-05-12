import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  AntDesign,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

export default function Icon({ iconType, name, size, color }: IconProps) {
  switch (iconType) {
    case 'antdesign':
      return <AntDesign name={name} size={size} color={color} />;
    case 'entypo':
      return <Entypo name={name} size={size} color={color} />;
    case 'font-awesome':
      return <FontAwesome name={name} size={size} color={color} />;
    case 'font-awesome-5':
      return <FontAwesome5 name={name} size={size} color={color} />;
    case 'font-awesome-6':
      return <FontAwesome6 name={name} size={size} color={color} />;
    case 'material':
      return <MaterialIcons name={name} size={size} color={color} />;
    case 'material-community':
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
    default:
      return <FontAwesome name={name} size={size} color={color} />;
  }
}

type IconProps = {
  iconType: string;
  name: any;
  size: number;
  color: string;
};

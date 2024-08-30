import { View, Platform, PixelRatio } from 'react-native';
import {
  Canvas,
  Path,
  Skia,
  Text,
  matchFont,
} from '@shopify/react-native-skia';

const radius = PixelRatio.roundToNearestPixel(32);
const STROKE_WIDTH = 8;
const innerRadius = radius - STROKE_WIDTH / 2;

export const GoalProcess = ({
  targetPercentage,
}: {
  targetPercentage: number;
}) => {
  const targetText = ~~(targetPercentage * 100);
  const m = Skia.Matrix();
  m.translate(radius, radius);
  m.rotate(-1.5);
  m.translate(-radius, -radius);
  const path = Skia.Path.Make().addCircle(radius, radius, innerRadius);
  path.transform(m);
  const fontFamily = Platform.select({ ios: 'Helvetica', default: 'serif' });
  const fontStyle = {
    fontFamily,
    fontSize: 16,
  };
  const font = matchFont(fontStyle);
  const width = String(targetText).length * 5;

  return (
    <View
      style={{
        flex: 1,
        width: radius * 2,
        height: radius * 2,
      }}
    >
      <Canvas style={{ flex: 1, marginLeft: -2 }}>
        <Path
          path={path}
          color={
            targetText > 100 ? 'red' : targetText > 60 ? 'orange' : 'lightblue'
          }
          style='stroke'
          strokeJoin='round'
          strokeWidth={STROKE_WIDTH}
          strokeCap='round'
          start={0}
          end={1}
          opacity={0.3}
        />
        <Path
          path={path}
          color={
            targetText > 100 ? 'red' : targetText > 60 ? 'orange' : 'lightblue'
          }
          style='stroke'
          strokeJoin='round'
          strokeWidth={STROKE_WIDTH}
          strokeCap='round'
          start={0}
          end={targetPercentage}
        />
        <Text
          x={innerRadius - width}
          y={radius + 6}
          text={`${targetText}%`}
          font={font}
          color={
            targetText > 100 ? '#540b0e' : targetText > 60 ? '#9a3412' : 'black'
          }
        />
      </Canvas>
    </View>
  );
};

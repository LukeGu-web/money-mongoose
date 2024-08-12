import { Drawer } from 'expo-router/drawer';
import DrawerContent from 'components/Drawer/DrawerContent';

export default function Layout() {
  return (
    <Drawer drawerContent={DrawerContent}>
      <Drawer.Screen
        name='(tab)' // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Home',
          headerShown: false,
        }}
      />
    </Drawer>
  );
}

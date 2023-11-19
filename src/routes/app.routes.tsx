import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { Home } from '../screens/Home';
import HomeSvg from '../assets/home.svg';
import { Platform } from "react-native";

type AppRoutes = {
    home: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

export function AppRoutes() {
    const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();
    const { sizes, colors } = useTheme();

    const iconSize = sizes[6];

    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.blue[500],
            tabBarInactiveTintColor: colors.blue[200],
            tabBarStyle: {
                backgroundColor: colors.gray[600],
                borderTopWidth: 0,
                height: Platform.OS === "android" ? 'auto' : 96,
                paddingBottom: sizes[10],
                paddingTop: sizes[6]
            }
        }}>
            <Screen
                name='home'
                component={Home}
                options={{
                    tabBarIcon: ({ color, }) => (
                        <HomeSvg fill={color} width={iconSize} height={iconSize} />
                    )
                }}
            />
        </Navigator>
    );
}
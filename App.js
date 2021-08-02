import React from "react";
import HomeScreen from "./screens/HomeScreen";
import RecommendedScreen from "./screens/RecommendedScreen";
import PopularScreen from "./screens/PopularScreen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { RFValue } from "react-native-responsive-fontsize";

export default function App() {
  return <AppContainer />;
}

const AppTopNavigation = createMaterialTopTabNavigator({
  Recommended: {
    screen: RecommendedScreen,
    navigationOptions: {
      tabBarOptions: {
        tabStyle: {
          backgroundColor: "white",
        },
        labelStyle: {
          color: "black",
        },
        indicatorStyle: {
          backgroundColor: "black",
        },
      },
    },
  },
  Popular: {
    screen: PopularScreen,
    navigationOptions: {
      tabBarOptions: {
        tabStyle: {
          backgroundColor: "white",
        },
        labelStyle: {
          color: "black",
        },
        indicatorStyle: {
          backgroundColor: "black",
        },
      },
    },
  },
});

const AppStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    appTopNavigation: {
      screen: AppTopNavigation,
      navigationOptions: {
        headerBackTitle: null,
        headerTintColor: "white",
        headerTitle: "Recommended",
        headerStyle: {
          backgroundColor: "#282c34",
        },
        headerTitleStyle: {
          color: "white",
          fontWeight: "bold",
          fontSize: RFValue(18),
        },
      },
    },
  },
  { initialRouteName: "Home" }
);

const AppContainer = createAppContainer(AppStackNavigator);

import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import RootNavigator from "./navigation/RootNavigator";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
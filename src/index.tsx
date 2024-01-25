import { useEffect } from "react"
import HomeScreen from "./screens/HomeScreen";
import Geolocation from 'react-native-geolocation-service';
import { Alert, Linking, PermissionsAndroid, Platform, ToastAndroid } from "react-native";
import { Provider } from "react-redux";
import store from "./redux";
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';

const darkTheme = {
    background: "#1A1A1A",
    foreground: "#FAFAFA",
    text: "#FAFAFA"
};

const lightTheme = {
    background: "#FAFAFA",
    foreground: "#1A1A1A",
    text: "#1A1A1A",
};

export const Entrypoint = () => {

    const scheme = useColorScheme();

    return <ThemeProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
        <Provider store={store}>
            <HomeScreen />
        </Provider>
    </ThemeProvider>

}
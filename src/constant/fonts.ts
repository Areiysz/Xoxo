import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Langsung pakai alias seperti "logo", "title", dst.
export const useCustomfonts = {
    logo: require("assets/fonts/CALVIN-Bold.otf"),
    title: require("assets/fonts/PlayfairDisplay-Bold.ttf"),
    body: require("assets/fonts/Lato-Regular.ttf"),
    italic: require("assets/fonts/Lato-Italic.ttf")
};

export function useLoadFonts() {
    const [fontsLoaded] = useFonts(useCustomfonts);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    return fontsLoaded;
}

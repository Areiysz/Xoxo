import { Text, View, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { color } from "@/constant/theme";
import { useLoadFonts } from "@/constant/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Splashscreen() {
    const router = useRouter();
    const fontsloaded = useLoadFonts();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("(route)");
        }, 1500);
    }, [router]);
    if (!fontsloaded) {
        return null;
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.maincontainer}>
                <Text style={styles.title}>Xoxo</Text>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.primary
    },
    maincontainer: {
        height: 100,
        width: 200,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 35,
        fontFamily: "logo",
        letterSpacing: 8,
        color: color.third
    }
});

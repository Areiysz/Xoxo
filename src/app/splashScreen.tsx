import { Text, View, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { color } from "@/constant/theme";
import { useLoadFonts } from "@/constant/fonts";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Splashscreen() {
    const router = useRouter();
    const fontsLoaded = useLoadFonts();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("(route)");
        }, 1500);
        return () => clearTimeout(timer);
    }, [router]);

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.maincontainer}>
                <Animated.Text
                    entering={FadeInDown.duration(700).springify()}
                    style={styles.title}
                >
                    Xoxo
                </Animated.Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2025 Rafi alfiansyah</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: color.primary,
        paddingVertical: 40
    },
    maincontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 35,
        fontFamily: "logo",
        letterSpacing: 8,
        color: color.secondary,
        textShadowColor: "rgba(0, 0, 0, 0.3)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 6
    },
    footer: {
        paddingBottom: 10
    },
    footerText: {
        fontSize: 12,
        fontWeight: "400",
        color: color.secondary,
        opacity: 0.6,
        fontFamily: "body"
    }
});

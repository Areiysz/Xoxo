import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Sliders } from "assets/onBoarding";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("screen");

const WellcomePage = () => {
    const [showHomePage, setShowHomePage] = useState(false);

    if (!showHomePage) {
        return (
            <View style={styles.container}>
                <AppIntroSlider
                    data={Sliders}
                    renderItem={({ item }) => (
                        <View style={styles.slide}>
                            {/* Logo */}
                            <View style={styles.header}>
                                <Text style={styles.logoText}>xoxo</Text>
                                <Text style={styles.lang}>EN</Text>
                            </View>

                            {/* Ilustrasi Lottie */}
                            <LottieView
                                source={item.animation}
                                style={styles.image}
                                autoPlay
                                loop
                            />

                            {/* Teks */}
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>
                                {item.description}
                            </Text>
                        </View>
                    )}
                    onDone={() => setShowHomePage(true)}
                    showSkipButton
                    showNextButton
                    renderNextButton={ButtonNext}
                    renderSkipButton={ButtonSkip}
                    renderDoneButton={ButtonStart}
                />
            </View>
        );
    }

    return (
        <View style={styles.homeContainer}>
            <Text style={styles.homeText}>This is your home page!</Text>
        </View>
    );
};

const ButtonNext = () => (
    <View style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
    </View>
);

const ButtonSkip = () => (
    <View style={styles.buttonOutline}>
        <Text style={styles.buttonOutlineText}>Skip</Text>
    </View>
);

const ButtonStart = () => (
    <View style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
    </View>
);

export default WellcomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    slide: {
        flex: 1,
        alignItems: "center",
        paddingTop: 40,
        paddingHorizontal: 24
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    lang: {
        fontSize: 14,
        color: "#888"
    },
    image: {
        width: width * 0.8,
        height: height * 0.4,
        marginBottom: 30
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
        marginBottom: 10
    },
    description: {
        fontSize: 16,
        color: "#444",
        textAlign: "center",
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: "#000",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginHorizontal: 10
    },
    buttonText: {
        color: "#fff",
        fontSize: 16
    },
    buttonOutline: {
        borderWidth: 1,
        borderColor: "#000",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginHorizontal: 10
    },
    buttonOutlineText: {
        color: "#000",
        fontSize: 16
    },
    homeContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    homeText: {
        fontSize: 24,
        color: "#000"
    },
    logoText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        letterSpacing: 2,
        textTransform: "uppercase"
    }
});

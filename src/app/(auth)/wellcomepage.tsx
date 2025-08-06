import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WellcomePage = () => {
    return (
        <View style={styles.container}>
            <Text>WellcomePage</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default WellcomePage;

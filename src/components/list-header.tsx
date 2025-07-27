import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { color } from "@/constant/theme";
import { Link } from "expo-router";
import { useLoadFonts } from "@/constant/fonts";
import Ionicons from "@expo/vector-icons/Ionicons";

export const ListHeader = () => {
    const fontsLoaded = useLoadFonts();
    if (!fontsLoaded) return null;

    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerTop}>
                <Text style={styles.logoText}>XOXO</Text>

                <View style={styles.headerIcons}>
                    {/* ✅ Buka Modal */}
                    <Pressable
                        style={styles.iconWrapper}
                        onPress={() => setCartVisible(true)}
                    >
                        {({ pressed }) => (
                            <View>
                                <Ionicons
                                    name="bag-handle-outline"
                                    size={22}
                                    color="black"
                                    style={{ opacity: pressed ? 0.5 : 1 }}
                                />
                                <View style={styles.badgeContainer}>
                                    <Text style={styles.Itemcount}>1</Text>
                                </View>
                            </View>
                        )}
                    </Pressable>

                    {/* 🔎 Link ke search */}
                    <Link style={styles.iconWrapper} href={"/search"} asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <Ionicons
                                    name="search"
                                    size={22}
                                    color="black"
                                    style={{ opacity: pressed ? 0.5 : 1 }}
                                />
                            )}
                        </Pressable>
                    </Link>
                </View>
            </View>

            {/* 🖼️ Hero/Banner */}
            <View style={styles.heroContainer}>
                <Image
                    source={require("assets/images/hero.png")}
                    style={styles.heroImage}
                />
            </View>

            {/* 📂 Kategori */}
            <View style={styles.cetegoriesContainer}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        gap: 20,
        paddingHorizontal: 10,
        paddingTop: 16
    },
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    logoText: {
        fontSize: 24,
        fontFamily: "logo"
    },
    headerIcons: {
        flexDirection: "row",
        gap: 12
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        alignItems: "center",
        justifyContent: "center"
    },
    heroContainer: {
        height: 200,
        backgroundColor: "#f5f5f5",
        borderRadius: 10
    },
    heroImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 10
    },
    cetegoriesContainer: {
        height: 50,
        backgroundColor: "#eee",
        borderRadius: 10
    },
    badgeContainer: {
        position: "absolute",
        top: -7,
        right: -10,
        justifyContent: "center",
        alignItems: "center",
        height: 15,
        width: 15,
        borderRadius: 50, // ganti dari string jadi number
        backgroundColor: color.primary
    },
    Itemcount: {
        fontSize: 10,
        fontFamily: "italic",
        color: color.secondary
    }
});

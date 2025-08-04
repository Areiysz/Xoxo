import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    FlatList
} from "react-native";
import { CATEGORIES } from "assets/categories";
import {useCartStore} from "@/store/cart-store";
import Cart from "@/app/cart";
import { color } from "@/constant/theme";
import { Link, useRouter } from "expo-router";
import { useLoadFonts } from "@/constant/fonts";
import Ionicons from "@expo/vector-icons/Ionicons";

export const ListHeader = () => {
    const { getItemCount } = useCartStore();
    const router = useRouter();
    const [isCartVisible, setCartVisible] = useState(false);
    const fontsLoaded = useLoadFonts();
    if (!fontsLoaded) return null;

    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerTop}>
                <Text style={styles.logoText}>XOXO</Text>

                <View style={styles.headerIcons}>
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
                                    <Text style={styles.Itemcount}>
                                        {getItemCount()}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </Pressable>
                    <Pressable
                        style={styles.iconWrapper}
                        onPress={() => router.push("/search")}
                    >
                        {({ pressed }) => (
                            <Ionicons
                                name="search"
                                size={22}
                                color="black"
                                style={{ opacity: pressed ? 0.5 : 1 }}
                            />
                        )}
                    </Pressable>
                </View>
            </View>

            <View style={styles.heroContainer}>
                <Image
                    source={require("assets/images/hero.png")}
                    style={styles.heroImage}
                />
            </View>

            <View style={styles.cetegoriesContainer}>
                <FlatList
                    data={CATEGORIES}
                    renderItem={({ item }) => (
                        <Pressable
                            style={styles.category}
                            onPress={() =>
                                router.push(`/categories/${item.slug}`)
                            }
                        >
                            <Image
                                source={{ uri: item.imageUrl }}
                                style={styles.categoryImage}
                            />
                            <Text style={styles.categoriestitle}>
                                {item.name}
                            </Text>
                        </Pressable>
                    )}
                    keyExtractor={item => item.name}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                        <View style={styles.separator} />
                    )}
                    contentContainerStyle={styles.categoriesContent}
                />
            </View>
            <Cart
                isVisible={isCartVisible}
                onClose={() => setCartVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 10,
        paddingTop: 16
    },
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
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
        height: 100,
        borderRadius: 30,
        marginVertical: 20
    },
    categoriesContent: {
        paddingHorizontal: 5
    },
    separator: {
        width: 15
    },
    badgeContainer: {
        position: "absolute",
        top: -7,
        right: -10,
        justifyContent: "center",
        alignItems: "center",
        height: 15,
        width: 15,
        borderRadius: 50,
        backgroundColor: color.primary
    },
    Itemcount: {
        fontSize: 10,
        fontFamily: "italic",
        color: color.secondary
    },
    category: {
        width: 80,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20
    },
    categoryImage: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    categoriestitle: {
        fontSize: 15,
        fontFamily: "italic",
        marginTop: 3
    }
});

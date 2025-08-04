import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    FlatList
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useCartStore } from "@/store/cart-store";
import { MasonryFlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductListItem } from "@/components/product-list-item";
import { color } from "@/constant/theme";
import Cart from "@/app/cart";
import { CATEGORIES } from "assets/categories";
import { PRODUCTS } from "assets/products";
import Ionicons from "@expo/vector-icons/Ionicons";

const Categories = () => {
    const { getItemCount } = useCartStore();
    const router = useRouter();
    const [isCartVisible, setCartVisible] = useState(false);
    const { slug } = useLocalSearchParams<{ slug: string }>();

    const category = CATEGORIES.find(category => category.slug === slug);
    if (!category) {
        router.push("/404");
        return null;
    }

    const products = PRODUCTS.filter(product => product.category.slug === slug);
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    flex: 1
                }}
            >
                <View style={styles.NavWrapper}>
                    <View style={styles.arrowIcon}>
                        <Pressable onPress={() => router.back()}>
                            {({ pressed }) => (
                                <Ionicons
                                    name="arrow-back-outline"
                                    size={22}
                                    color={color.primary}
                                    style={{
                                        opacity: pressed ? 0.5 : 1
                                    }}
                                />
                            )}
                        </Pressable>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{category.name}</Text>
                    </View>
                    <View>
                        <Pressable
                            style={styles.iconWrapper}
                            onPress={() => setCartVisible(true)}
                        >
                            {({ pressed }) => (
                                <View>
                                    <Ionicons
                                        name="bag-handle-outline"
                                        size={22}
                                        color={color.primary}
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
                    </View>
                </View>
                <MasonryFlashList
                    data={products}
                    numColumns={2}
                    estimatedItemSize={300}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <ProductListItem product={item} />
                    )}
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                />
                <Cart
                    isVisible={isCartVisible}
                    onClose={() => setCartVisible(false)}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    NavWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 5,
        marginHorizontal: 10
    },
    badgeContainer: {
        position: "absolute",
        top: 12,
        right: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 15,
        width: 15,
        borderRadius: 50,
        backgroundColor: color.primary
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
    Itemcount: {
        fontSize: 10,
        fontFamily: "italic",
        color: color.secondary
    },
    titleContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 40
    },
    title: {
        fontSize: 24,
        fontFamily: "title"
    },
    arrowIcon: {
        height: 40,
        width: 40,
        borderWidth: 1,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc"
    },
    content: {
        paddingHorizontal: 10,
        paddingBottom: 20
    }
});

export default Categories;

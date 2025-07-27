import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    Dimensions
} from "react-native";
import { Link } from "expo-router";
import { useLoadFonts } from "@/constant/fonts";
import { Product } from "assets/types/product";
import { color } from "@/constant/theme";

const { width } = Dimensions.get("window");
const COLUMN_GAP = 12;
const ITEM_WIDTH = (width - COLUMN_GAP * 3) / 2;

type Props = {
    product: Product;
};

export const ProductListItem = ({ product }: Props) => {
    const fontsLoaded = useLoadFonts();
    if (!fontsLoaded) return null;

    const imageHeight = Math.floor(Math.random() * 60) + 160;

    return (
        <View style={styles.wrapper}>
            <Link asChild href={`/product/${product.slug}`}>
                <Pressable style={styles.pressable}>
                    <View
                        style={[styles.imageContainer, { height: imageHeight }]}
                    >
                        <Image
                            source={product.heroImage}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.title} numberOfLines={2}>
                            {product.title}
                        </Text>
                        <Text style={styles.price}>
                            ${product.price.toFixed(2)}
                        </Text>
                    </View>
                </Pressable>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: ITEM_WIDTH,
        backgroundColor: "#fff",
        borderRadius: 12,
        margin: COLUMN_GAP / 2,
        overflow: "hidden",
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    pressable: {
        flex: 1
    },
    imageContainer: {
        width: "100%"
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    info: {
        padding: 10,
        gap: 4
    },
    title: {
        fontSize: 10,
        fontFamily: "body",
        color: color.third
    },
    price: {
        fontSize: 8,
        fontFamily: "italic",
        color: color.primary
    }
});

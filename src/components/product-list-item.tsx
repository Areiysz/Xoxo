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

const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

export const ProductListItem = ({ product }: Props) => {
    const fontsLoaded = useLoadFonts();
    if (!fontsLoaded) return null;

    const imageHeight = Math.floor(Math.random() * 60) + 160;

    return (
        <View style={styles.wrapper}>
            <Link asChild href={`/product/${product.slug}`}>
                <Pressable style={styles.pressable}>
                    <View
                        style={[
                            styles.imageContainer,
                            { height: imageHeight }
                        ]}
                    >
                        <Image
                            source={product.heroImage}
                            style={styles.image}
                        />
                        {/* Badge optional */}
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>Baru</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.title} numberOfLines={2}>
                            {product.title}
                        </Text>
                        <Text style={styles.price}>
                            {formatRupiah(product.price)}
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
        borderRadius: 16,
        margin: COLUMN_GAP / 2,
        overflow: "hidden",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
    },
    pressable: {
        flex: 1,
    },
    imageContainer: {
        width: "100%",
        position: "relative",
        overflow: "hidden",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    badge: {
        position: "absolute",
        top: 8,
        left: 8,
        backgroundColor: color.primary,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 10,
        color: "#fff",
        fontFamily: "semiBold",
    },
    info: {
        padding: 12,
        gap: 6,
    },
    title: {
        fontSize: 14,
        fontFamily: "semiBold",
        color: "#222",
    },
    price: {
        fontSize: 12,
        fontFamily: "italic",
        color: color.primary,
    },
});
import { useState } from "react";
import { PRODUCTS } from "assets/products";
import { useLocalSearchParams, useRouter } from "expo-router";
import Cart from "@/app/cart";
import { StatusBar } from "expo-status-bar";
import { useCartStore } from "@/store/cart-store";
import { useLoadFonts } from "@/constant/fonts";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    FlatList,
    TouchableOpacity,
    Animated
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useToast } from "react-native-toast-notifications";
import { color } from "@/constant/theme";
import { BlurView } from "expo-blur";

const ProductDetails = () => {
    const toast = useToast();
    const { getItemCount, items, incrementItem, decrementItem, addItem } =
        useCartStore();
    const [isCartVisible, setCartVisible] = useState(false);
    const router = useRouter();
    const fontsLoaded = useLoadFonts();
    const { slug } = useLocalSearchParams<{ slug: string }>();

    const product = PRODUCTS.find(product => product.slug === slug);
    if (!product) {
        router.push("/404");
    }

    const cartItem = items.find(item => item.id === product.id);
    const initialQuantity = cartItem ? cartItem.quantity : 1;
    const [quantity, setQuantity] = useState(initialQuantity);

    const increaseQuantity = () => {
        if (quantity < product.maxQuantity) {
            setQuantity(prev => prev + 1);
            incrementItem(product.id);
        } else {
            toast.show("Cannot add more than maximum quantity", {
                type: "warning",
                placement: "top"
            });
        }
    };
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
            decrementItem(product.id);
        }
    };
    const addToCart = () => {
        addItem({
            id: product.id,
            title: product.title,
            image: product.heroImage,
            price: product.price,
            quantity
        });
        toast.show("Added to cart", {
            type: "success",
            placement: "top",
            duration: 1500
        });
    };

    const formatRupiah = (value: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(value);

    const [liked, setLiked] = useState(false);
    const scale = useState(new Animated.Value(1))[0];

    const totalPrice = (product.price * quantity).toFixed(2);

    const handleLikeToggle = () => {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 1.3,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            })
        ]).start();
        setLiked(!liked);
    };

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <StatusBar style="default" />
            <View style={styles.imageContainer}>
                <View style={styles.navBar}>
                    <BlurView
                        intensity={50}
                        tint="default"
                        style={styles.iconButton}
                    >
                        <Pressable
                            onPress={() => router.back()}
                            style={styles.iconInner}
                        >
                            {({ pressed }) => (
                                <Ionicons
                                    name="arrow-back-sharp"
                                    size={21}
                                    color={color.secondary}
                                    style={pressed && styles.pressedIcon}
                                />
                            )}
                        </Pressable>
                    </BlurView>

                    <View style={styles.menuRightSection}>
                        <BlurView
                            intensity={50}
                            tint="default"
                            style={styles.iconButton}
                        >
                            <Pressable onPress={() => setCartVisible(true)}>
                                <Ionicons
                                    name="bag-outline"
                                    size={22}
                                    color={color.secondary}
                                />
                                <View style={styles.badgeContainer}>
                                    <Text style={styles.Itemcount}>
                                        {getItemCount()}
                                    </Text>
                                </View>
                            </Pressable>
                        </BlurView>
                        <BlurView
                            intensity={50}
                            tint="default"
                            style={styles.iconButton}
                        >
                            <Ionicons
                                name="arrow-redo-outline"
                                size={21}
                                color={color.secondary}
                            />
                        </BlurView>
                        <BlurView
                            intensity={50}
                            tint="default"
                            style={styles.iconButton}
                        >
                            <Pressable
                                onPress={() => router.push("/search")}
                                style={styles.iconInner}
                            >
                                {({ pressed }) => (
                                    <Ionicons
                                        name="search-outline"
                                        size={21}
                                        color={color.secondary}
                                        style={pressed && styles.pressedIcon}
                                    />
                                )}
                            </Pressable>
                        </BlurView>
                    </View>
                </View>

                <FlatList
                    data={product.imagesUrl}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image source={item} style={styles.heroImage} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    snapToAlignment="start"
                    decelerationRate="fast"
                />

                <View style={styles.contentWrapper}>
                    <FlatList
                        data={product.imagesUrl}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Image source={item} style={styles.variantImage} />
                        )}
                        horizontal
                        nestedScrollEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.variantListContent}
                        style={styles.variantList}
                    />
                    <View>
                        <Text style={styles.price}>
                            {formatRupiah(product.price)}
                        </Text>
                    </View>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{product.title}</Text>
                    </View>

                    <View style={styles.productMetaWrapper}>
                        <View style={styles.ratingSoldWrapper}>
                            <View style={styles.ratingStars}>
                                <Ionicons
                                    name="star"
                                    size={14}
                                    color="#facc15"
                                />
                                <Ionicons
                                    name="star"
                                    size={14}
                                    color="#facc15"
                                />
                                <Ionicons
                                    name="star"
                                    size={14}
                                    color="#facc15"
                                />
                                <Ionicons
                                    name="star"
                                    size={14}
                                    color="#facc15"
                                />
                                <Ionicons
                                    name="star-half"
                                    size={14}
                                    color="#facc15"
                                />
                            </View>
                            <Text style={styles.soldText}>
                                4.8 • 5RB+ Terjual
                            </Text>
                        </View>

                        <View style={styles.cartButtonWrapper}>
                            <TouchableOpacity
                                onPress={decreaseQuantity}
                                disabled={quantity <= 1}
                            >
                                <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{quantity}</Text>
                            <TouchableOpacity
                                onPress={increaseQuantity}
                                disabled={quantity >= product.maxQuantity}
                            >
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.addItemContainer}>
                <View style={styles.iconActionWrapper}>
                    <Pressable onPress={handleLikeToggle}>
                        <Animated.View style={{ transform: [{ scale }] }}>
                            <Ionicons
                                name={liked ? "heart" : "heart-outline"}
                                size={22}
                                color={liked ? "red" : color.third}
                            />
                        </Animated.View>
                    </Pressable>
                </View>

                <View style={styles.iconActionWrapper}>
                    <Pressable>
                        <Ionicons
                            name="chatbubble-ellipses-outline"
                            size={22}
                            color="#333"
                        />
                    </Pressable>
                </View>

                <TouchableOpacity
                    style={[
                        styles.addToCartButton,
                        {
                            opacity: quantity === 0 ? 0.5 : 1
                        }
                    ]}
                    onPress={addToCart}
                >
                    <Ionicons
                        name="bag-outline"
                        size={16}
                        color={color.secondary}
                    />
                    <Text style={styles.addToCartText}>Add to cart</Text>
                </TouchableOpacity>
            </View>
            <Cart
                isVisible={isCartVisible}
                onClose={() => setCartVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.secondary
    },
    imageContainer: {
        position: "relative"
    },
    navBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 25,
        paddingHorizontal: 16,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: 70,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: "hidden"
    },
    iconButton: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: "rgba(128,128,128,0.2)",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    iconInner: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    pressedIcon: {
        opacity: 0.5
    },
    heroImage: {
        width: 400,
        height: 400,
        resizeMode: "cover"
    },
    menuRightSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    contentWrapper: {
        backgroundColor: color.secondary,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -18,
        zIndex: 5,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 40,
        gap: 5
    },
    variantList: {
        height: 75
    },
    variantListContent: {
        gap: 8,
        flexGrow: 0
    },
    variantImage: {
        height: 75,
        width: 75,
        borderRadius: 8
    },
    title: {
        fontSize: 20,
        fontFamily: "title"
    },
    productMetaWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    ratingSoldWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    ratingStars: {
        flexDirection: "row",
        alignItems: "center"
    },
    soldText: {
        fontSize: 12,
        fontWeight: "bold"
    },
    cartButtonWrapper: {
        width: 80,
        height: 35,
        borderRadius: 50,
        backgroundColor: color.secondary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 5
    },
    quantity: {
        fontSize: 15,
        fontFamily: "italic"
    },
    quantityButtonText: {
        fontSize: 18,
        fontFamily: "logo"
    },
    addItemContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingBottom: 30,
        paddingTop: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12
    },
    iconActionWrapper: {
        height: 44,
        width: 44,
        borderRadius: 10,
        backgroundColor: "#f3f3f3",
        alignItems: "center",
        justifyContent: "center"
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: color.primary,
        paddingVertical: 14,
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 5
    },
    addToCartText: {
        fontSize: 13,
        color: color.secondary,
        fontWeight: "bold"
    },
    badgeContainer: {
        position: "absolute",
        bottom: -4,
        right: -4,
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
    price: {
        fontSize: 20,
        fontWeight: "bold",
        color: color.primary,
        fontFamily: "title",
        marginTop: 8
    }
});

export default ProductDetails;

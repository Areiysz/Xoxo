import Modal from "react-native-modal";
import { useCartStore } from "@/store/cart-store";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Pressable
} from "react-native";
import { color } from "@/constant/theme";
import { useLoadFonts } from "@/constant/fonts";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(value);

type CartItemType = {
    id: string;
    title: string;
    image: any;
    price: number;
    quantity: number;
};

type CartItemProps = {
    item: CartItemType;
    onRemove: (id: number) => void;
    onIncrement: (id: number) => void;
    onDecrement: (id: number) => void;
};

const CartItem = ({
    item,
    onRemove,
    onIncrement,
    onDecrement
}: CartItemProps) => (
    <View style={styles.CartItem}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>{formatRupiah(item.price)}</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity
                    onPress={() => onDecrement(item.id)}
                    style={styles.quantityButton}
                >
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
                <TouchableOpacity
                    onPress={() => onIncrement(item.id)}
                    style={styles.quantityButton}
                >
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity
            onPress={() => onRemove(item.id)}
            style={styles.removeButton}
        >
            <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
    </View>
);

export default function Cart({
    isVisible,
    onClose
}: {
    isVisible: boolean;
    onClose: () => void;
}) {
    const fontsLoaded = useLoadFonts();
    const { items, removeItem, incrementItem, decrementItem, getTotalPrice } =
        useCartStore();
    if (!fontsLoaded) return null;

    return (
        <Modal
            isVisible={isVisible}
            swipeDirection="down"
            onSwipeComplete={onClose}
            onBackdropPress={onClose}
            style={styles.modal}
        >
            <View style={styles.content}>
                <View style={styles.mainContainer}>
                    <StatusBar style="dark" />
                    <View style={styles.navbar}>
                        <View style={styles.navbarIndicator} />
                        <Text style={styles.navbarTitle}>Your Cart</Text>
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.closeButton}
                        >
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={items}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <CartItem
                                item={item}
                                onRemove={removeItem}
                                onIncrement={incrementItem}
                                onDecrement={decrementItem}
                            />
                        )}
                        contentContainerStyle={{
                            paddingBottom: 180,
                            paddingTop: 8
                        }}
                        showsVerticalScrollIndicator={false}
                    />

                    <View style={styles.footer}>
                        <View style={styles.priceWraper}>
                            <Text style={styles.totalText}>Your total:</Text>
                            <Text style={styles.totalPrice}>
                                {formatRupiah(getTotalPrice())}
                            </Text>
                        </View>
                        <Pressable
                            style={styles.checkoutButton}
                            onPress={() => {}}
                        >
                            <Text style={styles.checkoutText}>
                                Pay now - {formatRupiah(getTotalPrice())}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0
    },
    content: {
        height: "90%",
        backgroundColor: "#fdfdfd",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: "hidden"
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "#fdfdfd",
        paddingHorizontal: 20,
        paddingTop: 10
    },
    navbar: {
        paddingTop: 12,
        paddingBottom: 20,
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#f0f0f0",
        position: "relative"
    },
    navbarIndicator: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#ccc",
        marginBottom: 12
    },
    navbarTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222"
    },
    closeButton: {
        position: "absolute",
        right: 0,
        top: 10,
        padding: 8
    },
    CartItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: "#f5f5f5",
        resizeMode: "cover"
    },
    itemDetails: {
        flex: 1,
        marginLeft: 12
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#222",
        marginBottom: 2
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: "500",
        color: "#444",
        marginBottom: 10
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: color.third,
        justifyContent: "center",
        alignItems: "center"
    },
    quantityButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff"
    },
    itemQuantity: {
        fontSize: 16,
        minWidth: 24,
        textAlign: "center",
        fontWeight: "500"
    },
    removeButton: {
        padding: 6,
        backgroundColor: "#ff4d4f",
        borderRadius: 10,
        marginLeft: 8
    },
    removeButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600"
    },
    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#eee",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 6,
        gap: 12
    },
    priceWraper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    totalText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#999"
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000"
    },
    checkoutButton: {
        backgroundColor: "#000",
        width: "100%",
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center"
    },
    checkoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    }
});
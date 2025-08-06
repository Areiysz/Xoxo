import {
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList,
    Image
} from "react-native";
import { ORDERS } from "assets/orders";
import { useLoadFonts } from "@/constant/fonts";
import { useRouter, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const OrdersDetails = () => {
    const fontsloaded = useLoadFonts();
    const { slug } = useLocalSearchParams();
    const router = useRouter();
    const order = ORDERS.find(order => order.slug === slug);
    if (!order) return router.replace("/404");
    if (!fontsloaded) return null;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.navbar}>
                <Pressable
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={20} color="#111" />
                </Pressable>
                <Text style={styles.navTitle}>Tracking</Text>
            </View>

            {/* Product Card */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Image
                        source={order.items[0].heroImage}
                        style={styles.cardImage}
                    />
                    <View style={styles.cardContent}>
                        <Text style={styles.productName}>{order.item}</Text>
                        <Text style={styles.statusText}>🚚 {order.status}</Text>
                    </View>
                </View>

                <Text style={styles.detailsText}>{order.details}</Text>
                <View
                    style={[
                        styles.statusBadge,
                        styles[`statusBadge_${order.status}`]
                    ]}
                >
                    <Text style={styles.badgeText}>{order.status}</Text>
                </View>
                <Text style={styles.dateText}>{order.date}</Text>
            </View>

            {/* Item List */}
            <FlatList
                data={order.items}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.itemList}
                renderItem={({ item }) => (
                    <View style={styles.itemCard}>
                        <Image
                            source={item.heroImage}
                            style={styles.itemImage}
                        />
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemPrice}>${item.price}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5"
    },
    navbar: {
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: "#f5f5f5",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16
    },
    backButton: {
        marginRight: 16
    },
    navTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111"
    },
    card: {
        backgroundColor: "#fff",
        margin: 16,
        borderRadius: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12
    },
    cardImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12
    },
    cardContent: {
        flex: 1
    },
    productName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111",
        marginBottom: 4
    },
    statusText: {
        fontSize: 14,
        color: "#555"
    },
    detailsText: {
        fontSize: 14,
        color: "#777",
        marginTop: 4,
        marginBottom: 8
    },
    statusBadge: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 100,
        alignSelf: "flex-start",
        marginBottom: 8
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#333"
    },
    statusBadge_Pending: {
        backgroundColor: "#FFF3CD"
    },
    statusBadge_Completed: {
        backgroundColor: "#D1E7DD"
    },
    statusBadge_Shipped: {
        backgroundColor: "#CCE5FF"
    },
    statusBadge_InTransit: {
        backgroundColor: "#E2D9F3"
    },
    dateText: {
        fontSize: 12,
        color: "#999"
    },
    itemList: {
        paddingHorizontal: 16,
        paddingBottom: 40
    },
    itemCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
        resizeMode: "cover"
    },
    itemInfo: {
        flex: 1,
        justifyContent: "center"
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#111",
        marginBottom: 4
    },
    itemPrice: {
        fontSize: 14,
        color: "#555"
    }
});

export default OrdersDetails;

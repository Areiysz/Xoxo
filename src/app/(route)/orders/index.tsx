import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Pressable
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Order, OrderStatus } from "@/types/order";
import { ORDERS } from "assets/orders";

const STATUSES: OrderStatus[] = [
    "Pending",
    "InTransit",
    "Shipped",
    "Completed"
];

const OrdersScreen = () => {
    const [activeTab, setActiveTab] = useState<OrderStatus>("Pending");
    const router = useRouter();

    const filteredOrders = ORDERS.filter(order => order.status === activeTab);

    const renderOrder = ({ item }: { item: Order }) => {
        const total = item.items.reduce(
            (sum, product) => sum + product.price,
            0
        );

        return (
            <Pressable
                onPress={() => router.push(`/orders/${item.slug}`)}
                style={styles.card}
            >
                <Image source={item.items[0].heroImage} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.title}>{item.item}</Text>
                    <Text style={styles.details}>${total.toFixed(2)}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            {/* Tab Section */}

            <View style={styles.navBar}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.navTitle}>My Orders</Text>
            </View>
            <View style={styles.tabs}>
                {STATUSES.map(status => (
                    <TouchableOpacity
                        key={status}
                        onPress={() => setActiveTab(status)}
                        style={[
                            styles.tabItem,
                            activeTab === status && styles.activeTabItem
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === status && styles.activeTabText
                            ]}
                        >
                            {status}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Orders List */}
            {filteredOrders.length > 0 ? (
                <FlatList
                    data={filteredOrders}
                    keyExtractor={item => item.id}
                    renderItem={renderOrder}
                    contentContainerStyle={{ paddingBottom: 16 }}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        No orders in this status
                    </Text>
                </View>
            )}
        </View>
    );
};

export default OrdersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 16
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 12,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 8
    },
    tabItem: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20
    },
    activeTabItem: {
        backgroundColor: "#000"
    },
    tabText: {
        fontSize: 14,
        color: "#555"
    },
    activeTabText: {
        color: "#fff",
        fontWeight: "bold"
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 10,
        backgroundColor: "#f5f5f5"
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        resizeMode: "cover",
        marginRight: 12
    },
    info: {
        flex: 1
    },
    title: {
        fontWeight: "bold",
        fontSize: 16
    },
    details: {
        fontSize: 14,
        color: "#444",
        marginTop: 2
    },
    date: {
        fontSize: 12,
        color: "#888",
        marginTop: 2
    },
    chevron: {
        fontSize: 24,
        color: "#999"
    },
    emptyContainer: {
        marginTop: 50,
        alignItems: "center"
    },
    emptyText: {
        color: "#888",
        fontSize: 16
    },
    navBar: {
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        marginBottom: 12
    },
    backButton: {
        position: "absolute",
        left: 20,
        top: "50%",
        transform: [{ translateY: -12 }]
    },
    navTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111"
    }
});

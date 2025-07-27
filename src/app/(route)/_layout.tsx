import React from "react";
import { color } from "@/constant/theme";
import { Tabs } from "expo-router";
import { useLoadFonts } from "@/constant/fonts";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type iconProps = {
    focused: boolean;
    color: string;
    active: string;
    inactive: string;
};

const TabsBarIcon = ({ focused, active, inactive, color }: iconProps) => (
    <Ionicons name={focused ? active : inactive} size={24} color={color} />
);
export default function Layout() {
    const fontsloaded = useLoadFonts();
    if (!fontsloaded) return null;
    return (
        <SafeAreaView
            edges={["top"]}
            style={{
                flex: 1
            }}
        >
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: color.primary,
                    tabBarInactiveTintColor: color.third,
                    tabBarLabelStyle: {
                        fontSize: 10,
                        fontWeight: "200",
                        fontFamily: "body",
                        marginTop: 3,
                        textTransform: "capitalize"
                    },
                    tabBarStyle: {
                        height: 100,
                        paddingTop: 14,
                        paddingBottom: 8
                    }
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "For you",
                        tabBarIcon: ({ color, focused }) => (
                            <TabsBarIcon
                                focused={focused}
                                active="paper-plane"
                                inactive="paper-plane-outline"
                                color={color}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="orders"
                    options={{
                        title: "Transaction",
                        tabBarIcon: ({ color, focused }) => (
                            <TabsBarIcon
                                focused={focused}
                                active="card"
                                inactive="card-outline"
                                color={color}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ color, focused }) => (
                            <TabsBarIcon
                                focused={focused}
                                active="person"
                                inactive="person-outline"
                                color={color}
                            />
                        )
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
}

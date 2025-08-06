import { useEffect } from "react";
import { color } from "@/constant/theme";
import { useRouter } from "expo-router";
import { Tabs } from "expo-router";
import { useAuth } from "@/providers/auth-providers";
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
    const router = useRouter();
    const { session, mounting } = useAuth();
    const fontsloaded = useLoadFonts();

    useEffect(() => {
    if (!mounting) {
        if (!session) {
            router.replace("/(auth)/wellcomepage");
        }
    }
}, [session, mounting]);
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
                    tabBarInactiveTintColor: color.primary,
                    tabBarLabelStyle: {
                        fontSize: 10,
                        fontWeight: "200",
                        fontFamily: "body",
                        marginTop: 3,
                        textTransform: "capitalize"
                    },
                    tabBarStyle: {
                        height: 90,
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

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";
import AuthProvider from "@/providers/auth-providers";
export default function RootLayout() {
    return (
        <ToastProvider>
            <AuthProvider>
                <SafeAreaProvider>
                    <Stack
                        screenOptions={{
                            headerShown: false
                        }}
                    >
                        <Stack.Screen
                            name="splashScreen"
                            options={{
                                title: "splashscreen"
                            }}
                        />
                        <Stack.Screen
                            name="(route)"
                            options={{
                                title: "home"
                            }}
                        />
                        <Stack.Screen
                            name="categories"
                            options={{
                                title: "Categories"
                            }}
                        />
                        <Stack.Screen
                            name="products"
                            options={{
                                title: "Products"
                            }}
                        />
                        <Stack.Screen
                            name="(auth)/wellcomepage"
                            options={{
                                title: "Auth"
                            }}
                        />
                        <Stack.Screen
                            name="search"
                            options={{
                                title: "Search"
                            }}
                        />
                        <Stack.Screen
                            name="cart"
                            options={{
                                title: "Cart"
                            }}
                        />
                    </Stack>
                </SafeAreaProvider>
            </AuthProvider>
        </ToastProvider>
    );
}

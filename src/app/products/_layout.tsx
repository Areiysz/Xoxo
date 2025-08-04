import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="[slug]"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    );
}

import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CategoryLayout() {
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

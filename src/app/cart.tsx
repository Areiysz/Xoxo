import Modal from "react-native-modal";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
export default function Cart({
    isVisible,
    onClose
}: {
    isVisible: boolean;
    onClose: () => void;
}) {
    return (
        <Modal
            isVisible={isVisible}
            swipeDirection="down"
            onSwipeComplete={onClose}
            onBackdropPress={onClose}
            style={styles.modal}
        >
            <View style={styles.content}>
                <Text>Test doang</Text>
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
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
});

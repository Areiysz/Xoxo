import React from "react";
import { View, StyleSheet, ViewStyle, Dimensions } from "react-native";
import Modal from "react-native-modal";

const { height: screenHeight } = Dimensions.get("window");

type ReusableModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
};

const ReusableModal = ({
  isVisible,
  onClose,
  children,
  containerStyle,
}: ReusableModalProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver={false} // ✅ hindari bug muncul dari samping
      useNativeDriverForBackdrop={true}
      style={styles.modal}
    >
      <View style={[styles.modalContainer, containerStyle]}>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end", // ✅ muncul dari bawah
    margin: 0,
  },
  modalContainer: {
    height: screenHeight * 0.8, // ✅ 80% tinggi layar
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});

export default ReusableModal;
// app/cart.tsx
import React from "react";
import { View, Text, Button, ScrollView } from "react-native";

export const CartModalContent = ({ onClose }: { onClose: () => void }) => (
  <View style={{ flex: 1 }}>
    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
      Keranjang Kamu
    </Text>
    <ScrollView>
      {/* Dummy isi keranjang */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Text key={i} style={{ marginBottom: 10 }}>
          Item #{i + 1}
        </Text>
      ))}
    </ScrollView>
    <Button title="Tutup" onPress={onClose} />
  </View>
);
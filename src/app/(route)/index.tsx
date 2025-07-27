import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MasonryFlashList } from "@shopify/flash-list";
import { ProductListItem } from "@/components/product-list-item";
import { PRODUCTS } from "assets/products";

export default function Home() {
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={PRODUCTS}
        numColumns={2}
        estimatedItemSize={300}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductListItem product={item} />}
        ListHeaderComponent={
          <Text style={styles.header}>Produk Terbaik 🔥</Text>
        }
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  content: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  header: {
    fontSize: 22,
    fontFamily: "body",
    color: "#111",
    paddingVertical: 14,
  },
});
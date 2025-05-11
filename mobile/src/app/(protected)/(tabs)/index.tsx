import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApi } from "@/lib/useApi";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

const HomeScreen = () => {
  const api = useApi();

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchAllUsers"],
    queryFn: async () => {
      try {
        const response = await api.get("/users");
        return response.data;
      } catch (err) {
        console.error("API error:", err);
        throw err;
      }
    },
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading users...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          Error loading users: {error.toString()}
        </Text>
      </View>
    );
  }

  const users: User[] = data?.data || [];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Users</Text>
      <UserTable users={users} />
    </SafeAreaView>
  );
};

const UserTable = ({ users }: { users: User[] }) => (
  <View style={styles.tableContainer}>
    <View style={styles.tableHeader}>
      <Text style={styles.headerCell}>ID</Text>
      <Text style={styles.headerCell}>Name</Text>
      <Text style={styles.headerCell}>Email</Text>
      <Text style={styles.headerCell}>Created At</Text>
    </View>
    {users.length === 0 ? (
      <Text style={styles.emptyList}>No users found.</Text>
    ) : (
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.idCol]}>{item.id}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.email}</Text>
            <Text style={styles.cell}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
        )}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  tableContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 12,
  },
  cell: {
    flex: 1,
  },
  idCol: {
    width: 120,
  },
  emptyList: {
    textAlign: "center",
    padding: 20,
    color: "#666",
  },
});

export default HomeScreen;

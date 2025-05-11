import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApi } from '@/lib/useApi';
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Type definition for the API response
type CreateUserResponse = {
  statusCode: number;
  data: {
    id: string;
    email: string;
    password: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
  success: boolean;
};

export default function AddUserScreen() {
  const api = useApi();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (userData: typeof formData) => {
      const response = await api.post<CreateUserResponse>("/users", userData);
      return response.data;
    },
    onSuccess: (data) => {
      // Clear form
      setFormData({ name: "", email: "", password: "" });
      // Show success message
      Alert.alert("Success", data.message);
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["fetchAllUsers"] });
    },
    onError: (error: Error) => {
      Alert.alert("Error", `Failed to create user: ${error.message}`);
    },
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.password) {
      Alert.alert("Validation Error", "All fields are required");
      return;
    }
    mutate(formData);
  };

  if (isPending) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Creating user...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add New User</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Enter full name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            placeholder="Enter password"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isPending}
        >
          <Text style={styles.submitButtonText}>Create User</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

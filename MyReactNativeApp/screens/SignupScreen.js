import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const signupSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignupScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signupSchema)
  });

  const onSignup = async (data) => {
    try {
      const response = await fetch("http://192.168.1.26:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "User registered successfully!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      console.error("Signup Failed:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Email" onChangeText={onChange} value={value} />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={onChange} value={value} />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      <Button title="Sign Up" onPress={handleSubmit(onSignup)} />
      <Text onPress={() => navigation.navigate("Login")} style={styles.link}>Already have an account? Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  error: { color: "red", marginBottom: 10 },
  link: { color: "blue", textAlign: "center", marginTop: 10 }
});

export default SignupScreen;

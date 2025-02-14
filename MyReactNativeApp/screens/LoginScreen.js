import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onLogin = (data) => {
    console.log("Login Data:", data);

    // If login is successful, navigate to the Home screen
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button title="Login" onPress={handleSubmit(onLogin)} />
      <Text onPress={() => navigation.navigate("Signup")} style={styles.link}>Don't have an account? Sign Up</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  error: { color: "red", marginBottom: 10 },
  link: { color: "blue", textAlign: "center", marginTop: 10 },
});

export default LoginScreen;

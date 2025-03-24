import { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, Alert 
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../ctx"; // Asegúrate de importar tu contexto
import { useRouter } from "expo-router"; // Importa el router

export default function LoginScreen() {
  const { signIn } = useSession();
  const router = useRouter(); // Hook para navegar
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tu correo y contraseña");
      return;
    }

    setLoading(true);

    // Simula la validación de credenciales
    if (email === "enrique" && password === "123") {
      await signIn(email, password); // Llama a signIn con las credenciales
      router.push("/"); // Redirige al index
    } else {
      Alert.alert("Error", "Correo o contraseña incorrectos");
    }

    setLoading(false);
  };

  const handleSocialMediaClick = (platform) => {
    const urls = {
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    };
    Linking.openURL(urls[platform]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>UTPark</Text>
      </View>

      <View style={styles.mainContent}>
        <Text style={styles.title}>Inicio sesión</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Introduce tu correo"
            placeholderTextColor="rgba(255,255,255,0.5)"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Introduce tu contraseña"
            placeholderTextColor="rgba(255,255,255,0.5)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin} 
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? "Cargando..." : "Inicia sesión"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.registerText}>¿Aún no tienes cuenta? Regístrate</Text>
          </TouchableOpacity>a
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.socialMediaContainer}>
          <TouchableOpacity onPress={() => handleSocialMediaClick("twitter")}>
            <MaterialCommunityIcons name="twitter" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSocialMediaClick("instagram")}>
            <MaterialCommunityIcons name="instagram" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSocialMediaClick("youtube")}>
            <MaterialCommunityIcons name="youtube" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  menuButton: {
    padding: 4,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
  },
  label: {
    color: "#fff",
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: "#fff",
    fontSize: 16,
  },
  forgotPassword: {
    color: "#fff",
    textDecorationLine: "underline",
    textAlign: "right",
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#1a0f0f",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    color: "#fff",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  socialMediaContainer: {
    flexDirection: "row",
    gap: 16,
  },
});
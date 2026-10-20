import { useAuth } from "@/context/AuthContext";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  SHADOWS,
  SPACING,
} from "@/constants/tokens";
import { isValidEmail } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const { reason } = useLocalSearchParams<{ reason?: string }>();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const sessionMessage =
    reason === "expired"
      ? "Sesi login telah berakhir. Silakan masuk kembali."
      : reason === "unauthorized"
        ? "Akses ditolak. Silakan login kembali."
        : "";

  const handleLogin = async () => {
    if (submitting) return;

    if (email.trim() === "" || password === "") {
      setError("Email dan password tidak boleh kosong");
      return;
    }
    if (!isValidEmail(email.trim())) {
      setError("Format email tidak valid");
      return;
    }

    setSubmitting(true);

    try {
      const result = await login(email, password);

      if (!result.ok) {
        setError(result.error ?? "Login gagal");
        return;
      }

      setError("");
      router.replace("/(tabs)/beranda");
    } catch {
      setError("Terjadi kesalahan saat login. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.iconWrap}>
          <Ionicons name="person-circle-outline" size={64} color={COLORS.primary[700]} />
        </View>
        <Text style={styles.title}>Selamat Datang</Text>
        <Text style={styles.subtitle}>Masuk untuk mulai belajar</Text>

        {sessionMessage !== "" && (
          <View style={styles.sessionBanner}>
            <Ionicons
              name="alert-circle-outline"
              size={20}
              color={COLORS.error}
            />
            <Text style={styles.sessionText}>{sessionMessage}</Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, error !== "" && styles.inputError]}
            placeholder="lorem@example.com"
            placeholderTextColor={COLORS.text.tertiary}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (error !== "") setError("");
            }}
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrap}>
            <TextInput
              style={[styles.passwordInput, error !== "" && styles.inputError]}
              placeholder="••••••••"
              placeholderTextColor={COLORS.text.tertiary}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (error !== "") setError("");
              }}
            />
            <Pressable
              style={styles.eyeBtn}
              onPress={() => setShowPassword((prev) => !prev)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={COLORS.text.secondary}
              />
            </Pressable>
          </View>

          {error !== "" && <Text style={styles.errorText}>{error}</Text>}

          <Pressable
            style={[styles.loginBtn, submitting && styles.loginBtnDisabled]}
            onPress={handleLogin}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color={COLORS.text.white} />
            ) : (
              <Text style={styles.loginBtnText}>Masuk</Text>
            )}
          </Pressable>

          <Text style={styles.hint}>Demo: lorem@example.com / lorem123</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: SPACING.xxl,
  },
  iconWrap: {
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: "800",
    color: COLORS.text.primary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    textAlign: "center",
    marginTop: SPACING.xs,
    marginBottom: SPACING.xxl,
  },
  sessionBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: "#FEF2F2",
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  sessionText: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    lineHeight: 18,
    color: COLORS.error,
  },
  card: {
    backgroundColor: COLORS.background.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    ...SHADOWS.md,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border.light,
    backgroundColor: COLORS.background.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  passwordWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border.light,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background.white,
    marginBottom: SPACING.sm,
  },
  passwordInput: {
    flex: 1,
    padding: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
  },
  eyeBtn: {
    padding: SPACING.sm,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.sm,
    marginBottom: SPACING.sm,
  },
  loginBtn: {
    backgroundColor: COLORS.primary[700],
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  loginBtnDisabled: {
    opacity: 0.7,
  },
  loginBtnText: {
    color: COLORS.text.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
  },
  hint: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text.tertiary,
    textAlign: "center",
    marginTop: SPACING.md,
  },
});

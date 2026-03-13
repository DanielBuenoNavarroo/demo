import { db } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { config } from "@/lib/config";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ID } from "react-native-appwrite";
import { Button, SegmentedButtons, Text, TextInput, useTheme } from "react-native-paper";

const FREQUENCIES = ["daily", "weekly", "monthly"];
type Frequency = (typeof FREQUENCIES)[number];

export default function AddHabitsScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [error, setError] = useState("")

  const { user } = useAuth();

  const router = useRouter();
  const theme = useTheme()

  const handleSubmit = async () => {
    if (!user) return;

    try {
      await db.createDocument(
        config.env.appwrite.db,
        config.env.appwrite.db_habitsCol,
        ID.unique(),
        {
          user_id: user.$id,
          title,
          description,
          frequency,
          streak_count: 0,
          last_completed: new Date().toISOString(),
        },
      );

      router.back();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      }

      setError("Error while creating the habit.")
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label={"Title"}
        mode="outlined"
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label={"Description"}
        mode="outlined"
        onChangeText={setDescription}
        style={styles.input}
      />
      <View style={styles.frequencyContainer}>
        <SegmentedButtons
          value={frequency}
          onValueChange={(value) => setFrequency(value as Frequency)}
          buttons={FREQUENCIES.map((freq) => ({
            value: freq,
            label: freq.charAt(0).toUpperCase() + freq.slice(1),
          }))}
        />
      </View>
      <Button
        mode="contained"
        onPress={handleSubmit}
        disabled={!title || !description}
      >
        Add Habit
      </Button>
      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },

  input: {
    marginBottom: 16,
  },

  frequencyContainer: {
    marginBottom: 24,
  },
});

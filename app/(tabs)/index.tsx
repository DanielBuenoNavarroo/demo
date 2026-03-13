import { db } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { config } from "@/lib/config";
import { Habit } from "@/types/databases.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button, Text } from "react-native-paper";

export default function Index() {
  const { signOut, user } = useAuth();

  const [habits, setHabits] = useState<Habit[]>();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await db.listDocuments(
        config.env.appwrite.db,
        config.env.appwrite.db_habitsCol,
        [Query.equal("user_id", user?.$id ?? "")],
      );
      console.log(response.documents);
      setHabits(response.documents as unknown as Habit[]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text>Today&apos;s Habits</Text>
        <Button mode="text" onPress={signOut} icon={"logout"}>
          Sign Out
        </Button>
      </View>
      {habits?.length === 0 ? (
        <View>
          <Text>No Habits yet. Add your first Habit!</Text>
        </View>
      ) : (
        habits?.map((habit, key) => (
          <View key={key}>
            <Text>{habit.title}</Text>
            <Text>{habit.description}</Text>
            <View>
              <View>
                <MaterialCommunityIcons
                  name="fire"
                  size={18}
                  color={"#ff9800"}
                />
                <Text>{habit.streak_count} day streak</Text>
              </View>
            </View>
          </View>
        ))
      )}
    </View>
  );
}

import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import styles from "./nearbyjobs.style";
import { FlashList } from "@shopify/flash-list";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { useFetch } from "../../../hooks/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        <FlashList
          data={data}
          estimatedItemSize={100}
          ListEmptyComponent={
            isLoading ? (
              <ActivityIndicator color={COLORS.primary} />
            ) : error ? (
              <Text>Something went wrong</Text>
            ) : (
              <Text>Nothing here.</Text>
            )
          }
          renderItem={({ item }) => (
            <NearbyJobCard
              job={item}
              onPress={() => {
                router.push(`/job-details/${item?.job_id}`);
              }}
            />
          )}
          keyExtractor={item => item?.job_id}
        />
      </View>
    </View>
  );
};

export default Nearbyjobs;

import { useCallback, useEffect, useMemo, useState } from "react";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Text,
  Dimensions,
} from "react-native";

import { useFetch } from "../../hooks/useFetch";
import { COLORS, SIZES, icons } from "../../constants";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";

export interface JobDetailsProps {}

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails: React.FC<JobDetailsProps> = () => {
  const { width, height } = Dimensions.get("screen");
  const router = useRouter();
  const params = useGlobalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const { data, isLoading, error, refetch } = useFetch(
    "job-details",
    {
      job_id: params?.id || "",
    },
    false
  );

  const DisplayTabContent = useMemo(() => {
    switch (activeTab) {
      case tabs[1]: {
        return () => (
          <Specifics
            title={tabs[1]}
            points={data[0]?.job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      }
      case tabs[0]: {
        return () => (
          <JobAbout info={data[0]?.job_description ?? "No data provided"} />
        );
      }
      case tabs[2]: {
        return () => (
          <Specifics
            title={tabs[2]}
            points={data[0]?.job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
      }
      default: {
        return () => <></>;
      }
    }
  }, [activeTab, data[0]]);

  useEffect(() => {
    if (params.id) {
      refetch();
    }
  }, [params]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension={"60%"}
              onPress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension={"60%"} />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size={"large"} color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>Nothing here.</Text>
          ) : (
            <View
              style={{
                padding: SIZES.medium,
                paddingBottom: 100,
              }}
            >
              <Company job={data[0]} />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              <DisplayTabContent />
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={
            data[0]?.job_google_link ??
            "https://careers.google.com/jobs/results"
          }
        />
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default JobDetails;

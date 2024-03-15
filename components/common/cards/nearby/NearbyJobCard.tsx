import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableOpacityProps,
} from "react-native";

import styles from "./nearbyjobcard.style";
import { checkImageURL } from "../../../../utilities";
import { images } from "../../../../constants";

export interface NearbyJobCardProps extends TouchableOpacityProps {
  job?: any;
}

const NearbyJobCard: React.FC<NearbyJobCardProps> = ({ job, ...props }) => {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(job?.employer_logo)
              ? job?.employer_logo
              : images.fallback,
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job?.job_title}
        </Text>
        <Text style={styles.jobType} numberOfLines={1}>
          {job?.job_employment_type}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;

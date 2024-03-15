import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableOpacityProps,
  ImageStyle,
} from "react-native";

import styles from "./popularjobcard.style";
import { checkImageURL } from "../../../../utilities";
import { images } from "../../../../constants";

export interface PopularJobCardProps extends TouchableOpacityProps {
  selectedJob: any;
  item: any;
}

const PopularJobCard: React.FC<PopularJobCardProps> = ({
  selectedJob,
  item,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={(styles as any).container(selectedJob, item)}
      {...props}
    >
      <TouchableOpacity
        style={(styles as any).logoContainer(selectedJob, item)}
      >
        <Image
          source={{
            uri: checkImageURL(item?.employer_logo)
              ? item?.employer_logo
              : images.fallback,
          }}
          resizeMode="contain"
          style={styles.logoImage as ImageStyle}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item?.employer_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text
          style={(styles as any).jobName(selectedJob, item)}
          numberOfLines={1}
        >
          {item?.job_title}
        </Text>
        <Text style={styles.location}>{item?.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;

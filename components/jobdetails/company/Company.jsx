import { View, Text, Image } from "react-native";

import styles from "./company.style";
import { icons, images } from "../../../constants";
import { checkImageURL } from "../../../utilities";

const Company = ({ job }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: checkImageURL(job?.employer_logo)
              ? job?.employer_logo
              : images.fallback,
          }}
          style={styles.logoImage}
        />
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{job?.job_title}</Text>
      </View>
      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{job?.employer_name} /</Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage}
          />
          <Text style={styles.locationName}>{job?.job_country}</Text>
        </View>
      </View>
    </View>
  );
};

export default Company;

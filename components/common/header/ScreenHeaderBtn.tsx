import React from "react";
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import styles from "./screenheader.style";

export interface ScreenHeaderBtnProps extends TouchableOpacityProps {
  dimension?: string;
  iconUrl?: ImageSourcePropType;
}

const ScreenHeaderBtn: React.FC<ScreenHeaderBtnProps> = ({
  iconUrl,
  dimension,
  ...props
}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} {...props}>
      {iconUrl && (
        <Image
          source={iconUrl}
          resizeMode={"cover"}
          style={styles.btnImg(dimension)}
        />
      )}
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;

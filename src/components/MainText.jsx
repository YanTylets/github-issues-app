import { StyleSheet, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const MainText = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[styles.textStyle, style]}>
      {children}
    </Text>
  );
};

MainText.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

export default MainText;

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "flex-start",
    fontSize: 22
  }
});

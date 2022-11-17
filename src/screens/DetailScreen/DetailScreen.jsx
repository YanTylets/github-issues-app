import { SafeAreaView, ScrollView, TextInput, View } from "react-native";
import React, { useState } from "react";
import PropTypes from "prop-types";
import MainText from "../../components/MainText";
import { styles } from "./styles";

const DetailScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <MainText>{route.params.issue.title}</MainText>
        <MainText>{route.params.issue.body}</MainText>
        <MainText>{route.params.issue.state}</MainText>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          multiline
          onChangeText={setComment}
          value={comment}
          placeholder="Type comment here"
        />
      </View>
    </SafeAreaView>
  );
};

DetailScreen.propTypes = {
  route: PropTypes.object
};

export default DetailScreen;

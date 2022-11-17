import { SafeAreaView, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MainText from "../../components/MainText";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

const DetailScreen = ({ route }) => {
  const [value, setValue] = useState("");
  const [allComments, setAllComments] = useState([]);

  const storeComment = async comment => {
    try {
      if (allComments.length === 0) {
        await AsyncStorage.setItem(route.params.issue.id.toString(), JSON.stringify(comment));
      } else {
        await AsyncStorage.mergeItem(route.params.issue.id.toString(), JSON.stringify(comment));
      }
    } catch (e) {
      console.error(e);
    }
    console.log("Done.");
  };

  const getComment = async () => {
    try {
      const data = await AsyncStorage.getItem(route.params.issue.id.toString());
      if (data !== null) {
        const commentsArray = Object.entries(JSON.parse(data)).map(
          item => (item = { date: item[0], message: item[1] })
        );
        console.log("commentsArray", commentsArray);
        setAllComments(commentsArray);
      }
    } catch (e) {
      console.error(e);
    }
    console.log("Done.");
  };

  useEffect(() => {
    getComment();
  }, []);

  const sendComment = () => {
    const nowDate = dayjs();
    const comment = {};
    comment[nowDate] = value;
    storeComment(comment);
    setValue("");
  };

  const renderComments = () => {
    return allComments.map(item => {
      return (
        <View key={item.date}>
          <MainText>{item.message}</MainText>
          <MainText>{item.date}</MainText>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View>
          <MainText>{route.params.issue.title}</MainText>
          <MainText>{route.params.issue.state}</MainText>
          <MainText style={{ fontSize: 12 }}>{route.params.issue.body}</MainText>
          {renderComments()}
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          multiline
          onChangeText={setValue}
          value={value}
          placeholder="Type comment here"
        />
        <TouchableOpacity onPress={sendComment} style={styles.button}>
          <MainText style={{ fontSize: 16 }}>Send</MainText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

DetailScreen.propTypes = {
  route: PropTypes.object
};

export default DetailScreen;

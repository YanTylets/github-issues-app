import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { useHeaderHeight } from "@react-navigation/elements";

const DetailScreen = ({ route }) => {
  const [value, setValue] = useState("");
  const [allComments, setAllComments] = useState([]);

  const header = useHeaderHeight();

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
  };

  const getComment = async () => {
    try {
      const data = await AsyncStorage.getItem(route.params.issue.id.toString());
      if (data !== null) {
        const commentsArray = Object.entries(JSON.parse(data))
          .map(item => (item = { date: item[0], message: item[1] }))
          .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));
        setAllComments(commentsArray);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  const sendComment = () => {
    const nowDate = dayjs();
    const comment = {};
    comment[nowDate] = value;
    storeComment(comment);
    getComment();
    setValue("");
  };

  const renderComments = () => {
    return allComments.map(item => {
      return (
        <View key={item.date} style={styles.commentContainer}>
          <Text style={{ fontSize: 12, color: "grey", alignSelf: "flex-end" }}>
            {dayjs(item.date).format("DD.MM.YYYY")} at {dayjs(item.date).format("HH:mm")}
          </Text>
          <Text style={{ fontSize: 18 }}>{item.message}</Text>
        </View>
      );
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
      enabled
      keyboardVerticalOffset={header}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{route.params.issue.title}</Text>
          </View>
          <View style={styles.stateContainer}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              {route.params.issue.state}
            </Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={{ fontSize: 14 }}>{route.params.issue.body}</Text>
          </View>
          {renderComments()}
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
            <Text style={{ fontSize: 16 }}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

DetailScreen.propTypes = {
  route: PropTypes.object
};

export default DetailScreen;

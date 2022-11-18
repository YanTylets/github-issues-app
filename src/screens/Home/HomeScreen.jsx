import { Animated, SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { styles } from "./styles";
import MainText from "../../components/MainText";
import Loader from "../../components/Loader";
import axios from "axios";
import PropTypes from "prop-types";
import dayjs from "dayjs";

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [issues, setIssues] = useState([]);
  const [filtredIssues, setFiltredIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const getIssues = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/repos/facebook/react-native/issues?per_page=20&page=${page}`
      );
      console.log("response.data.length", issues.length);
      setIssues([...issues, ...response.data]);
      setFiltredIssues([...issues, ...response.data]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const searchFilter = text => {
    if (text) {
      const filtredData = issues.filter(item => {
        return item.title?.toUpperCase().indexOf(text.toUpperCase()) > -1;
      });
      setFiltredIssues(filtredData);
      setSearch(text);
    } else {
      setFiltredIssues(issues);
      setSearch(text);
    }
  };

  const loadNext = () => {
    let page = 2;
    getIssues(page);
    page++;
  };

  useEffect(() => {
    if (filtredIssues.length === 0) {
      getIssues();
    }
  }, []);

  const renderItem = ({ item, index }) => {
    const inputRange = [-1, 0, 100 * index, 100 * (index + 3)];
    const opacityInputRange = [-1, 0, 100 * index, 100 * (index + 1)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0]
    });
    const opacity = scrollY.interpolate({
      inputRange: opacityInputRange,
      outputRange: [1, 1, 1, 0]
    });

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DetailScreen", { issue: item });
        }}
      >
        <Animated.View style={[styles.listElementContiner, { transform: [{ scale }], opacity }]}>
          <MainText>{item.title}</MainText>
          <View style={styles.infoContainer}>
            <MainText style={{ fontSize: 12, color: item.state === "open" ? "green" : "red" }}>
              {item.state}
            </MainText>
            <MainText style={{ fontSize: 12, color: "#9797a8" }}>
              {dayjs(item.created_at).format("DD/MM/YYYY")}
            </MainText>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isError ? (
        <MainText>Error</MainText>
      ) : (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              multiline
              onChangeText={text => searchFilter(text)}
              value={search}
              placeholder="Search for issue..."
            />
          </View>

          <Animated.FlatList
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
              useNativeDriver: true
            })}
            contentContainerStyle={{ padding: 20 }}
            data={filtredIssues}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
            onEndReached={search ? null : loadNext}
            onEndReachedThreshold={0}
            ListFooterComponent={isLoading ? <Loader /> : null}
          />
        </>
      )}
    </SafeAreaView>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
export default HomeScreen;

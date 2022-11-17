import { Animated, SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { styles } from "./styles";
import MainText from "../../components/MainText";
import Loader from "../../components/Loader";
import axios from "axios";
import PropTypes from "prop-types";

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [issues, setIssues] = useState([]);
  const [filtredIssues, setFiltredIssues] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const getIssues = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/repos/facebook/react-native/issues?per_page=20&page=${page}`
      );
      console.log("response", response.data);
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
    setPage(page + 1);
  };

  useEffect(() => {
    getIssues();
  }, [page]);

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
          <MainText style={{ fontSize: 14 }}>{item.created_at}</MainText>
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
          <View>
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
            keyExtractor={item => item.number}
            renderItem={renderItem}
            onEndReached={search ? null : loadNext}
            onEndReachedThreshold={0.5}
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

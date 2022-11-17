import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import MainText from "../../components/MainText";
import Loader from "../../components/Loader";
import axios from "axios";
import PropTypes from "prop-types";

const HomeScreen = ({ navigation }) => {
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getIssues = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/repos/facebook/react-native/issues?per_page=20&page=${page}`
      );
      console.log("response", response.data);
      setIssues([...issues, ...response.data]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const loadNext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    getIssues();
  }, [page]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DetailScreen", { issue: item });
        }}
        style={styles.listElementContiner}
      >
        <MainText>{item.title}</MainText>
        <MainText style={{ fontSize: 14 }}>{item.created_at}</MainText>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isError ? (
        <MainText>Error</MainText>
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 20 }}
          data={issues}
          keyExtractor={item => item.number}
          renderItem={renderItem}
          onEndReached={loadNext}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isLoading ? <Loader /> : null}
        />
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

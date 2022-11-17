import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    backgroundColor: "#fff"
    // alignItems: "center",
    // justifyContent: "center",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  input: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    marginTop: 20,
    borderColor: "red",
    borderRadius: 5,
    fontSize: 20
  }
});

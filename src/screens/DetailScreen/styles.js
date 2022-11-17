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
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  input: {
    width: 295,
    alignSelf: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    // marginTop: 20,
    borderColor: "#0443e0",
    borderRadius: 5,
    fontSize: 20
  },
  button: {
    width: 46,
    height: 46,
    backgroundColor: "#0443e0",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  }
});

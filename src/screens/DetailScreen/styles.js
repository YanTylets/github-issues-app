import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10
  },
  titleContainer: {
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5
  },
  stateContainer: {
    width: 80,
    padding: 10,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    marginTop: 10,
    marginHorizontal: 10
  },
  bodyContainer: {
    padding: 10,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 1,
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 20
  },
  commentContainer: {
    padding: 10,
    borderRadius: 15,
    borderColor: "black",
    backgroundColor: "#fff",
    borderWidth: 1,
    marginBottom: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
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

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  listElementContiner: {
    width: "100%",
    height: 80,
    backgroundColor: "#fff",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: "#0443e0",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 5
  },
  inputContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 5
  },
  input: {
    width: 350,
    alignSelf: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    fontSize: 16
  },
  infoContainer: {
    width: 300,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

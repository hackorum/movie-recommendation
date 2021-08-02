import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AirbnbRating, Header, Icon } from "react-native-elements";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: {},
    };
  }
  timeConvert = (num) => {
    let hours = Math.floor(num / 60);
    let minutes = num % 60;
    return `${hours} hrs ${minutes} mins`;
  };
  getMovie = () => {
    const url = "http://localhost:5000/get_movie";
    axios
      .get(url)
      .then((response) => {
        let details = response.data.data;
        details["duration"] = this.timeConvert(details["duration"]);
        this.setState({ movieDetails: details });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  likeMovie = () => {
    const url = "http://localhost:5000/liked_movies";
    axios
      .post(url)
      .then((_response) => {
        this.getMovie();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  notLikeMovie = () => {
    const url = "http://af4176cc53de.ngrok.io/not_liked_movies";
    axios
      .post(url)
      .then((_response) => {
        this.getMovie();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  doNotWatch = () => {
    const url = "http://af4176cc53de.ngrok.io/do_not_watch";
    axios
      .post(url)
      .then((_response) => {
        this.getMovie();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  componentDidMount() {
    this.getMovie();
  }
  render() {
    const { movieDetails } = this.state;
    if (movieDetails.thumbnail) {
      const { thumbnail, title, release_date, duration, overview, rating } =
        movieDetails;
      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Header
              centerComponent={{
                text: "Movies",
                style: styles.headerTitle,
              }}
              rightComponent={{
                icon: "movie-open",
                color: "white",
                type: "material-community",
                onPress: () => this.props.navigation.navigate("Recommended"),
              }}
              backgroundColor={"#282c34"}
              containerStyle={{ flex: 1 }}
            />
          </View>
          <View style={styles.subContainer}>
            <View style={styles.subTopContainer}>
              <Image style={styles.posterImage} source={{ uri: thumbnail }} />
            </View>
            <View style={styles.subBottomContainer}>
              <View style={styles.upperBottomContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{`${
                  release_date.split("-")[0]
                } | ${duration}`}</Text>
              </View>
              <View style={styles.middleBottomContainer}>
                <View style={{ flex: 0.3 }}>
                  <AirbnbRating
                    count={10}
                    reviews={["", "", "", "", "", ""]}
                    defaultRating={rating}
                    isDisabled={true}
                    size={25}
                    starContainerStyle={{ marginTop: -30 }}
                  />
                </View>
                <View style={{ flex: 0.7, padding: 15 }}>
                  <Text style={styles.overview}>{overview}</Text>
                </View>
              </View>
              <View style={styles.lowerBottomContainer}>
                <View style={styles.iconButtonContainer}>
                  <TouchableOpacity onPress={() => this.likeMovie()}>
                    <Icon
                      reverse
                      name={"check"}
                      type={"entypo"}
                      size={25}
                      color={"green"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.notLikeMovie()}>
                    <Icon
                      reverse
                      name={"cross"}
                      type={"entypo"}
                      size={25}
                      color={"red"}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.doNotWatch()}
                  >
                    <Text style={styles.buttonText}>Did Not Watch</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { flex: 0.1 },
  headerTitle: { color: "#fff", fontWeight: "bold", fontSize: RFValue(18) },
  subContainer: { flex: 0.9 },
  subTopContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  posterImage: {
    width: "60%",
    height: "90%",
    resizeMode: "stretch",
    borderRadius: RFValue(30),
    marginHorizontal: RFValue(10),
  },
  subBottomContainer: { flex: 0.6 },
  upperBottomContainer: { flex: 0.2, alignItems: "center" },
  title: { fontSize: RFValue(20), fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: RFValue(14), fontWeight: "300" },
  middleBottomContainer: { flex: 0.35 },
  overview: {
    fontSize: RFValue(13),
    textAlign: "center",
    fontWeight: "300",
    color: "gray",
  },
  lowerBottomContainer: { flex: 0.45 },
  iconButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonCotainer: { justifyContent: "center", alignItems: "center" },
  button: {
    width: RFValue(160),
    height: RFValue(50),
    borderRadius: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    alignSelf: "center",
    marginTop: RFValue(15),
  },
  buttonText: { fontSize: RFValue(15), fontWeight: "bold" },
});

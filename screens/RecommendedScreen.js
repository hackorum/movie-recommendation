// import React, { Component } from "react";
// import { Text, StyleSheet, View, Flatlist } from "react-native";
// import { Card } from "react-native-elements";
// import axios from "axios";
// import { RFValue } from "react-native-responsive-fontsize";

// export default class RecommendedScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//     };
//   }
//   timeConvert = (num) => {
//     let hours = Math.floor(num / 60);
//     let minutes = num % 60;
//     return `${hours} hrs ${minutes} mins`;
//   };
//   getData = () => {
//     const url = "http://http://af4176cc53de.ngrok.io/recommended_movies";
//     axios
//       .get(url)
//       .then((response) => {
//         let details = response.data.data;
//         details["duration"] = this.timeConvert(details["duration"]);
//         this.setState({ data: details });
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };
//   keyExtractor = (_item, index) => index.toString();
//   renderItem = ({ item, index }) => {
//     return (
//       <Card
//         key={`card-${index}`}
//         image={{ uri: item.thumbnail }}
//         imageProps={{ resizeMode: "cover" }}
//         featuredTitle={item.title}
//         containerStyle={styles.cardContainer}
//         featuredTitleStyle={styles.title}
//         featuredSubtitle={`${item.release_date.split(" ")[0]} | ${duration}`}
//         featuredSubtitleStyle={styles.subtitle}
//       />
//     );
//   };
//   componentDidMount() {
//     this.getData();
//   }
//   render() {
//     const { data } = this.state;
//     return (
//       <View style={styles.container}>
//         <Flatlist
//           data={data}
//           renderItem={this.renderItem}
//           keyExtractor={this.keyExtractor}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   title: {
//     color: "#fff",
//     alignSelf: "flex-start",
//     paddingLeft: RFValue(15),
//     fontSize: RFValue(25),
//     marginTop: RFValue(65),
//   },
//   subtitle: {
//     fontWeight: "bold",
//     alignSelf: "flex-start",
//     paddingLeft: RFValue(15),
//     fontSize: RFValue(15),
//   },
//   cardContainer: {
//     flex: 1,
//     borderRadius: RFValue(10),
//     justifyContent: "center",
//     height: RFValue(110),
//     marginBottom: RFValue(20),
//   },
// });

import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

export default class RecommendedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  timeConvert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return `${hours} hrs ${minutes} mins`;
  }

  getData = () => {
    const url = "http://localhost:5000/recommended_movies";
    axios
      .get(url)
      .then(async (response) => {
        this.setState({ data: response.data.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItems = ({ item, index }) => {
    return (
      <Card
        key={`card-${index}`}
        image={{ uri: item.thumbnail }}
        imageProps={{ resizeMode: "cover" }}
        featuredTitle={item.title}
        containerStyle={styles.cardContainer}
        featuredTitleStyle={styles.title}
        featuredSubtitle={`${
          item.release_date.split("-")[0]
        } | ${this.timeConvert(item.duration)}`}
        featuredSubtitleStyle={styles.subtitle}
      ></Card>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItems}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    color: "#fff",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(25),
    marginTop: RFValue(65),
  },
  subtitle: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(15),
  },
  cardContainer: {
    flex: 1,
    borderRadius: RFValue(10),
    justifyContent: "center",
    height: RFValue(110),
    marginBottom: RFValue(20),
  },
});

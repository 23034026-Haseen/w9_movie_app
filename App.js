import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StatusBar,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet
} from 'react-native';

// global variable to store original data for filtering
let originalData = [];

const App = () => {
  const [mydata, setMydata] = useState([]);

  // Week 08 Web Service (Movie database)
  const myurl = "https://w8-movie.onrender.com/movies";

  // run once on first render to fetch data from Week 08 web service
  useEffect(() => {
    fetch(myurl)
      .then((response) => response.json())
      .then((myJson) => {
        setMydata(myJson);
        originalData = myJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // case-insensitive search filter
  const FilterData = (text) => {
    if (text !== '') {
      let myFilteredData = originalData.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setMydata(myFilteredData);
    } else {
      setMydata(originalData);
    }
  };

  // render each item in the List View
  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://via.placeholder.com/80"
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.genre} ({item.year})</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar />

      <Text style={styles.header}>
        Week 09 – Movie List (Data from Week 08 Web Service)
      </Text>

      <TextInput
        style={styles.searchBox}
        placeholder="Type movie title..."
        onChangeText={(text) => FilterData(text)}
      />

      {/* List View displaying data from Week 08 database */}
      <FlatList
        data={mydata}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default App;

// 🎨 STYLES
const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  header: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  searchBox: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

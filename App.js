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

// Online images for the movies
const images = {
  Inception: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_SY679_.jpg",
  Avengers: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg",
  Interstellar: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",
};

const App = () => {
  const [mydata, setMydata] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const myurl = "https://w9-movie-app.onrender.com/movies";

  // fetch data once
  useEffect(() => {
    fetch(myurl)
      .then((response) => response.json())
      .then((json) => {
        setMydata(json);
        setOriginalData(json);
      })
      .catch((error) => console.error(error));
  }, []);

  // filter search
  const FilterData = (text) => {
    if (text === '') {
      setMydata(originalData);
      return;
    }

    const filtered = originalData.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );

    setMydata(filtered);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: images[item.title] }}
        style={styles.image}
      />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.genre} ({item.year})</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.header}>Search Movies</Text>

      <TextInput
        style={styles.searchBox}
        placeholder="Type movie title..."
        onChangeText={FilterData}
      />

      <FlatList
        data={mydata}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default App;

// styles
const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  header: {
    fontSize: 18,
    marginBottom: 8
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
    height: 120, // taller for posters
    marginRight: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

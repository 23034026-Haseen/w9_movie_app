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

const App = () => {
  const [mydata, setMydata] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchText, setSearchText] = useState('');

  // ========== REPLACE WITH YOUR DEPLOYED SERVER URL ==========
  const myurl = "https://w9-movie-app.onrender.com/movies";
  // =========================================================

  // Fetch movies from API
  useEffect(() => {
    fetch(myurl)
      .then(async (response) => {
        const text = await response.text();
        try {
          const json = JSON.parse(text);
          const data = Array.isArray(json) ? json : [];
          setMydata(data);
          setOriginalData(data);
        } catch (e) {
          console.error("Invalid JSON from API:", text);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  // Filter movies as user types
  const FilterData = (text) => {
    setSearchText(text);
    if (!Array.isArray(originalData)) return;

    const filtered = originalData.filter((item) =>
      item.title?.toLowerCase().includes(text.toLowerCase())
    );

    setMydata(filtered); // show filtered list or empty array
  };

  // Render each movie
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image_url }}
        style={styles.image}
      />
      <View style={{ flex: 1 }}>
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
        value={searchText}
        onChangeText={FilterData}
      />

      <FlatList
        data={mydata}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No movies found
          </Text>
        }
      />
    </View>
  );
};

export default App;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  searchBox: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 120,
    marginRight: 10,
    borderRadius: 5
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

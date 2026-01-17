import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

const App = () => {
  const [mydata, setMydata] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchText, setSearchText] = useState('');

  // ========== Replace with your deployed server URL ==========
  const myurl = "https://w9-movie-app.onrender.com/movies";
  // ===========================================================

  // Fetch movies from API
  useEffect(() => {
    fetch(myurl)
      .then(res => res.json())
      .then(data => {
        const movies = Array.isArray(data) ? data : [];
        setMydata(movies);
        setOriginalData(movies);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        // fallback: default 3 movies if server fails
        const fallback = [
          { id: 1, title: 'Inception', genre: 'Sci-Fi', year: 2010 },
          { id: 2, title: 'Avengers', genre: 'Action', year: 2012 },
          { id: 3, title: 'Interstellar', genre: 'Sci-Fi', year: 2014 },
        ];
        setMydata(fallback);
        setOriginalData(fallback);
      });
  }, []);

  // Filter movies based on search
  const FilterData = (text) => {
    setSearchText(text);
    if (!Array.isArray(originalData)) return;

    const filtered = originalData.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );

    setMydata(filtered);
  };

  // Render each movie
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.genre} ({item.year})</Text>
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
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No movies found</Text>
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
    fontSize: 22,
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
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StatusBar,
  Text,
  TextInput,
  View,
  StyleSheet
} from 'react-native';

const App = () => {
  const [mydata, setMydata] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const myurl = "https://w9-movie-app.onrender.com/movies";

  // Fetch movies from API
  useEffect(() => {
    fetch(myurl)
      .then(res => res.json())
      .then(json => {
        console.log("API response:", json);
        // Ensure we get an array
        const data = Array.isArray(json) ? json : json.movies || [];
        setMydata(data);
        setOriginalData(data);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  // Filter movies when search text changes
  useEffect(() => {
    if (!Array.isArray(originalData)) return;

    if (searchText === '') {
      setMydata(originalData);
      return;
    }

    const filtered = originalData.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    setMydata(filtered);
  }, [searchText, originalData]);

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
        onChangeText={setSearchText}
      />

      {/* FlatList needs a container with flex: 1 to display properly */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={mydata}
          renderItem={renderItem}
          keyExtractor={(item) => item.id?.toString() || item.title}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              No movies found
            </Text>
          }
        />
      </View>
    </View>
  );
};

export default App;

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  searchBox: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5
  },
  card: {
    padding: 10,
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

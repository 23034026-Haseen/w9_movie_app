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

  // ========== REPLACE WITH YOUR DEPLOYED SERVER URL ==========
  const myurl = "https://your-server.onrender.com/movies";
  // =========================================================

  useEffect(() => {
    fetch(myurl)
      .then(async (response) => {
        const text = await response.text(); // read raw response
        try {
          const json = JSON.parse(text); // parse JSON
          const data = Array.isArray(json) ? json : [];
          setMydata(data);
          setOriginalData(data);
        } catch (e) {
          console.error("Invalid JSON from API:", text);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const FilterData = (text) => {
    if (!Array.isArray(originalData)) return;
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
        source={{ uri: item.image_url }}
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

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  searchBox: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 5
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#f9f9f9'
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

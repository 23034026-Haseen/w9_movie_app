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

  // Replace with your deployed server URL
  const myurl = "https://your-server.onrender.com/movies";

  // fetch data once
  useEffect(() => {
    fetch(myurl)
      .then((response) => response.json())
      .then((json) => {
        const data = Array.isArray(json) ? json : []; // safety check
        setMydata(data);
        setOriginalData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // filter search
  const FilterData = (text) => {
    if (!Array.isArray(originalData)) return; // safety check
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
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No movies found</Text>}
      />
    </View>
  );
};

export default App;

// styles
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

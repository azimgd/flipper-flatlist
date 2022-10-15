import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';

const generateRandomNumbers = (length, max) => {
  const data = [];
  const sizeMap = [];
  for (let i = 0; i < length; i++) {
    const number = Math.max(Math.floor(Math.random() * max), 20);
    const size = {
      offset: (sizeMap[sizeMap.length - 1]?.offset || 0) + (sizeMap[sizeMap.length - 1]?.length || 0),
      length: number,
    };

    data.push(number);
    sizeMap.push(size);
  }
  return {data, sizeMap};
};
const {data, sizeMap} = generateRandomNumbers(1000, 100);

const getItemLayout = (data, index) => {
  const layout = {length: sizeMap[index].length, offset: sizeMap[index].offset, index}
  return layout;
};

const App = () => {
  const renderItem = ({item, index}) => (
    <View style={[styles.item, {height: item}]}>
      <Text style={styles.text}>{index} - {item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    height: '100vh',
  },
  item: {
    backgroundColor: "#333",
    height: 50,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  text: {
    color: '#fff',
  },
});

export default App;

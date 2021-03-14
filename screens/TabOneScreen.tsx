import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet,
  Text, TouchableOpacity, View, ActivityIndicator, Image } from "react-native";

const DATA = [
  {
    id:"1",
    title:"First item",
  },
  {
    id:"2",
    title:"Another item",
  },
  {
    id:"3",
    title:"Next item",
  },

];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity style={[styles.item, style]} onPress={onPress}>
    <Image source={{uri:item.url}} style={{height:50, width:50}} />
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const App: () => React$Node = () => {

  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response)=>response.json())
    .then((json)=>setData(json))
    .catch((error)=>console.error(error))
    .finally(setIsLoading(false));
    },[]);

  const renderItem = ({item}) => {
    const backgroundColor = item.id===selectedId ? '#6e6e6e' : '#c0c0f0';
    return (<Item item={item}
      onPress={()=>{setSelectedId(item.id); alert(item.title);}}
      style={{backgroundColor}}
    />);
  }

  return (
    <>
      {isLoading ? <ActivityIndicator
        style={{marginVertical:20}} size="large" color="0000ff"/>:
        (<SafeAreaView style={styles.container}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
              />
        </SafeAreaView>
        )
      }
    </>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:0
    },
  item:{
    flex:1,
    flexDirection:'row',
    backgroundColor:'#c0c0f0',
    padding: 20,
    marginVertical:8,
    marginHorizontal:16
  },
  title:{
    flex: 1,
    flexWrap: 'wrap',
      fontSize:14
  }
});

export default App;

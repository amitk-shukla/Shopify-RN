import React, {useState} from 'react';
import URL from '../api/Urls';
import Loader from '../common/Loader';
import COLORS from '../common/Colors';

import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableHighlight,
} from 'react-native';

const Item = ({item}) => (
  <TouchableHighlight onPress={() => this.onRowPressed(item)}>
    <View style={styles.container}>
      <Image source={{uri: item.icon}} style={styles.photo} />
      <View style={styles.container_text}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  </TouchableHighlight>
);
const renderItem = ({item}) => <Item item={item} />;

const CategoryScreen = ({navigation}) => {
  let [loading, setLoading] = useState(false);
  let [category, setCategory] = useState([]);

  onRowPressed = item => {
    console.log(item);
    navigation.navigate('Merchant', {_id: item._id});
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      fetchCategory();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  fetchCategory = () => {
    setLoading(true);

    var dataToSend = {perPage: 20, page: 1};
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(URL.BASE + URL.PATH.CATEGORY + '?' + formBody, {
      method: 'GET',
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        if (responseJson.statusCode == 200) {
          setCategory(responseJson.data.data);
        } else {
          alert('No Data Found!!');
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, marginTop: 10}}>
      <Loader loading={loading} />
      <FlatList
        data={category}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  title: {
    fontSize: 18,
    color: '#000',
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  description: {
    fontSize: 12,
  },
  photo: {
    height: 50,
    width: 50,
    borderRadius: 6,
  },
});

export default CategoryScreen;

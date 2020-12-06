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
} from 'react-native';

const Item = ({item}) => (
  <View style={styles.container}>
    <Image source={{uri: item.merchant_image}} style={styles.photo} />
    <View style={styles.container_text}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.address}</Text>
    </View>
  </View>
);
const renderItem = ({item}) => <Item item={item} />;

const SubcategoryScene = ({route, navigation}) => {
  let [loading, setLoading] = useState(false);
  let [subcategory, setSubcategory] = useState([]);
  let [categoryId, setCategoryID] = useState(route.params.categoryId);
  let [merchantId, setMerchantID] = useState(route.params.merchantId);

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

    var dataToSend = {perPage: 20, page: 1, id: _id};
    console.log(dataToSend);
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(URL.BASE + URL.PATH.SUB_CATEGORY + '?' + formBody, {
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
          setMerchants(responseJson.data.data);
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
        data={merchants}
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

export default SubcategoryScene;

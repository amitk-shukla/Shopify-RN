import React, {useState} from 'react';
import {validateEmail} from '../utilites/Validator';
import URL from '../api/Urls';
import Loader from '../common/Loader';
import COLORS from '../common/Colors';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

//import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = ({navigation}) => {
  let [userEmail, setUserEmail] = useState('amitshukla@gmail.com');
  let [userPassword, setUserPassword] = useState('123456');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please Eenter Email');
      return;
    }
    if (!validateEmail(userEmail)) {
      alert('Email not valid');
      return;
    }
    if (!userPassword) {
      alert('Please Enter Password');
      return;
    }
    doLogin();
  };

  doLogin = () => {
    setLoading(true);

    var formBody = new FormData();
    formBody.append('email', userEmail);
    formBody.append('password', userPassword);
    formBody.append('role', 4);
    fetch(URL.BASE + URL.PATH.LOGIN, {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        console.log(responseJson);
        navigation.navigate('Category');

        // if (responseJson.statusCode == 200) {
        //   //AsyncStorage.setItem('user_id', responseJson.data[0].user_id);
        //   console.log(responseJson.data[0].user_id);
        //   props.navigation.navigate('Category');
        // } else {
        //   setErrortext(responseJson.message);
        // }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{marginTop: 100}}>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/images/food_app_logo.png')}
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: 'contain',
                  margin: 30,
                  borderRadius: 60,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={userEmail}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                underlineColorAndroid={COLORS.WHITE}
                placeholder="Enter Email"
                placeholderTextColor={COLORS.PLACEHOLDER}
                autoCapitalize="none"
                keyboardType="email-address"
                ref={ref => {
                  this._emailinput = ref;
                }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._passwordinput && this._passwordinput.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={userPassword}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                underlineColorAndroid={COLORS.WHITE}
                placeholder="Enter Password"
                placeholderTextColor={COLORS.PLACEHOLDER}
                keyboardType="default"
                ref={ref => {
                  this._passwordinput = ref;
                }}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.linkTextStyle}
              onPress={() => navigation.navigate('Registration')}>
              Don't have an account? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: COLORS.RED,
    borderWidth: 0,
    color: COLORS.WHITE,
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: COLORS.WHITE,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: COLORS.WHITE,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: COLORS.WHITE,
  },
  linkTextStyle: {
    color: COLORS.WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorTextStyle: {
    color: COLORS.ERROR,
    textAlign: 'center',
    fontSize: 14,
  },
});

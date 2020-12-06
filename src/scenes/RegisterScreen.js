import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
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
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

const RegisterScreen = ({navigation}) => {
  let [userPhoto, setUserPhoto] = useState('');
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [userRole, setUserRole] = useState('');
  let [userphone, setUserPhone] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');

  const handleSubmitPress = () => {
    setErrortext('');
    if (!firstName) {
      alert('Please Eenter First Name');
      return;
    }
    if (!lastName) {
      alert('Please Eenter Last Name');
      return;
    }
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
    if (!userRole) {
      alert('Please Enter User Role');
      return;
    }
    if (!userphone) {
      alert('Please Enter User Phone');
      return;
    }
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      compressImageQuality: 1,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then(image => {
        setUserPhoto(image);
      })
      .catch(err => {
        console.log('Catch' + err.toString());
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      compressImageQuality: 1,
      includeBase64: true,
    })
      .then(image => {
        setUserPhoto(image);
      })
      .catch(err => {
        console.log('Catch' + err.toString());
      });
  };

  const handleImagePress = () => {
    Alert.alert(
      '',
      'Select Options',
      [
        {
          text: 'Gallery',
          onPress: () => openGallery(),
        },
        {
          text: 'Camera',
          onPress: () => openCamera(),
        },
      ],
      {cancelable: true},
    );
  };

  doRegistration = () => {
    setLoading(true);

    var formBody = new FormData();
    formBody.append('email', userEmail);
    formBody.append('password', userPassword);
    formBody.append('role', 4);

    fetch(URL.BASE + URL.PATH.REGISTRATION, {
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
        if (responseJson.statusCode == 200) {
          console.log(responseJson.data[0].user_id);
        } else {
          setErrortext(responseJson.message);
          console.log('Please check your email id or password');
        }
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
            <TouchableOpacity onPress={handleImagePress}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={
                    userPhoto == ''
                      ? require('../assets/images/food_app_logo.png')
                      : {
                          uri: 'data:image/png;base64,' + userPhoto.data,
                        }
                  }
                  style={{
                    width: 120,
                    height: 120,
                    resizeMode: 'contain',
                    margin: 30,
                    borderRadius: 60,
                  }}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={value => setFirstName(value)}
                underlineColorAndroid={COLORS.WHITE}
                placeholder="Enter First Name"
                placeholderTextColor={COLORS.PLACEHOLDER}
                ref={ref => {
                  this._firstinput = ref;
                }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._lastinput && this._lastinput.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={value => setLastName(value)}
                underlineColorAndroid={COLORS.WHITE}
                placeholder="Enter Last Name"
                placeholderTextColor={COLORS.PLACEHOLDER}
                ref={ref => {
                  this._lastinput = ref;
                }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._emailinput && this._emailinput.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                underlineColorAndroid={COLORS.WHITE}
                placeholder="Enter Email" //dummy@abc.com
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
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                underlineColorAndroid={COLORS.WHITE}
                placeholder="Enter Password" //12345
                placeholderTextColor={COLORS.PLACEHOLDER}
                keyboardType="default"
                ref={ref => {
                  this._passwordinput = ref;
                }}
                onSubmitEditing={() =>
                  this._roleinput && this._roleinput.focus()
                }
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={value => setUserRole(value)}
                underlineColorAndroid={COLORS.WHITE}
                placeholder="Enter Role"
                placeholderTextColor={COLORS.PLACEHOLDER}
                keyboardType="numeric"
                ref={ref => {
                  this._roleinput = ref;
                }}
                onSubmitEditing={() =>
                  this._phoneinput && this._phoneinput.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={value => setUserPhone(value)}
                underlineColorAndroid={COLORS.WHITE}
                placeholder="Enter Phone" //12345
                placeholderTextColor={COLORS.PLACEHOLDER}
                keyboardType="numeric"
                ref={ref => {
                  this._phoneinput = ref;
                }}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>REGISTER</Text>
            </TouchableOpacity>
            <Text
              style={styles.linkTextStyle}
              onPress={() => navigation.navigate('Login')}>
              Already have an account? Login
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
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

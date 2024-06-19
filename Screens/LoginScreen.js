import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '938013235068-a2ub35u3hs5vlifngrae6s4u1u7clmrn.apps.googleusercontent.com',
  offlineAccess: true,
});

const LoginScreen = () => {
  const [userGoogleInfo, setUserGoogleInfo] = useState(null);
  const [error, setError] = useState(null);

  const backgroundImage = require('../assests/6803.jpg');

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const isSignedin = await GoogleSignin.isSignedIn();
      if(!isSignedin) {
        const userInfo = await GoogleSignin.signIn();
      setUserGoogleInfo(userInfo);
      }
      
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setError('Sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setError('Sign in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError('Play services not available or outdated');
      } else {
        setError('Something went wrong, please try again later');
      }
      console.log(error);
    }
  };
  const handleLinkedInLogin = () => {
    // Handle LinkedIn login
  };
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Login Screen</Text>
        
        <GoogleSigninButton
          onPress={handleGoogleLogin}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          style={styles.googleButton}
        />
        
        <TouchableOpacity
          style={styles.linkedInButton}
          onPress={handleLinkedInLogin}>
          <Text style={styles.buttonText}>Sign in with LinkedIn</Text>
        </TouchableOpacity>
        
        {error && <Text style={{ color: 'red',paddingTop:20 }}>{error}</Text>}
        
        {userGoogleInfo && (
          <View>
            <Text>{userGoogleInfo.user.name}</Text>
            <Text>{userGoogleInfo.user.email}</Text>
            {userGoogleInfo.user.photo && (
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: userGoogleInfo.user.photo }}
              />
            )}
          </View>
        )}

        {!userGoogleInfo && !error && (
          <Text style={{ color: 'white' }}>Not Signed In</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  googleButton: {
    // backgroundColor: '#DB4437',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  linkedInButton: {
    backgroundColor: '#0077B5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;

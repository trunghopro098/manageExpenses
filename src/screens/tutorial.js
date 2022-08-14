import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import background1 from '../public/img/bf.jpg'

export default function Tutorial({navigation}) {
    return (
        <ImageBackground
        source={background1}
        style={styles.container}>
          <View style={styles.content}>
           <View style={{width: '100%', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <Image source={require("../public/img/cancle.png")} 
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius:50
                  }}
                  resizeMode='contain'
                />
            </TouchableOpacity>
            </View>
            <Text style={{color:"red", fontWeight:'bold', fontSize: 20, textAlign:'center', marginTop: 20 }}>
            WELCOME TO MANAGE PERSONAL EXPENSES APPLICATION
            </Text>
           <View style={{width: "100%",marginTop: 20}}>
            <Text style={{fontSize: 16, color: 'white'}}>
            MANAGE PERSONAL EXPENSES helps you make personal spending statistics.
            </Text>
            <Text style={{color: 'white', fontSize: 16, marginTop: 5, }}>
              Now we will show you how to use the application:
            </Text>
            <Text style={{color: 'white', fontSize: 16, marginTop: 5, }}>
              1. On the home screen, select spending.
            </Text>
            <Text style={{color: 'white', fontSize: 16, marginTop: 5, }}>
              2. Enter your spending, including the name of your living expenses, the price you have spent then the application will save and calculate the amount of money you have spent for the day.
            </Text>
            <Text style={{color: 'white', fontSize: 16, marginTop: 5, }}>
              The application allows you to review past spending history, by clicking on the Expenses History button on the main screen.
            </Text>
          </View>
          </View>
        </ImageBackground>
    
      )
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection:'column',
        justifyContent:"center",
        alignItems:'center'
      },
      content:{
        width: "90%",
        height: "90%",
        backgroundColor: 'rgba(0,0,0, .7)',
        padding: 20,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center'
      }
    
    })
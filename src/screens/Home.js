import { View, Text, ImageBackground, StatusBar, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { dataButton } from '../../util/data'
import background1 from '../public/img/bf.jpg'
export default function Home({navigation}) {
    const history = ()=>{
        navigation.navigate('history');
    }
  return (
    <ImageBackground
        source={background1}
        style={styles.container}>
        <StatusBar 
            backgroundColor="#e6ccff"
            barStyle="dark-content"
        />
        <View
            style={{
            flex:1,
            backgroundColor: 'rgba(0,0,0, .7)',
            alignItems:'center',
            paddingHorizontal: 20
            }}
        >
        <Text style={{marginTop: 100,marginBottom:20, fontSize:20, color:'white', fontWeight:'bold',fontStyle:'italic'}}>
            MANAGE PERSONAL EXPENSES
        </Text>

        <View style={styles.body}>
                <TouchableOpacity style={styles.btn1}onPress={()=>{navigation.navigate('detail')}}>
                    <LinearGradient colors={["#ccccff","#f2e6ff","#ccffff"]} style={styles.layoutBTN}>
                        <Text style={styles.textButton}>
                            Spending
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn1} onPress={()=>{navigation.navigate('history')}}>
                    <LinearGradient colors={["#ccffff","#99bbff","#cc99ff"]} style={styles.layoutBTN}>
                        <Text style={styles.textButton}>
                            Expenses history
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            <TouchableOpacity style={styles.btn1} onPress={()=>{navigation.navigate('tutorial')}}>
                <LinearGradient colors={["#ccccff","#cc99ff","#8080ff"]} style={styles.layoutBTN}>
                    <Text style={styles.textButton}>
                      Tutorial
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View> 
        </View>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    linear:{
        flex:1,
        width: "100%",
        height:"100%",
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    header:{
        width: "100%",
        height: 50,
        backgroundColor:'white',
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height: 1
        },
        shadowOpacity:.5,
        shadowRadius: 2,
        elevation: 3,
        flexDirection:'row',
        alignItems:'center',
    },
    body:{
        width: "80%",
        height: "70%",
        backgroundColor:'transparent',
        marginTop:10,
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center'
    },
    btn1:{
        width: "80%",
        height: 60,
        borderRadius: 4,
        overflow:'hidden'
    },
    layoutBTN:{
        width: "100%",
        height:"100%",
        justifyContent:'center',
        alignItems:'center'
    },
    textButton:{
        fontSize: 18,
        fontWeight:'bold',
        color:'black'
    }
})
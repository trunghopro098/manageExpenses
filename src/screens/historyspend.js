import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { windowH, windowW } from '../util/widthHeight'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from 'react-native-gesture-handler';

export default function Historyspend() {
    const [data, setdata] = useState([])
    const [datatoday, setdatatoday] = useState(0)
    const [total, settotal] = useState(0)
    const today = new Date()
    const datetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    useEffect(() => {
        getlocal()
        getlocalCaculator()
    }, [])

    const getlocal = async()=>{
       const data1 =  await AsyncStorage.getItem("DATA") 
        if( data1 !== null){
            const arr = JSON.parse(data1)
            const a = arr.reverse()
            setdata(a)
        }
    }
    const getlocalCaculator = async()=>{
        const data1 =  await AsyncStorage.getItem("DATA")
        let t = 0; 
        let t1 = 0; 
         if( data1 !== null){
             const arr = JSON.parse(data1)
             const a = arr.filter((x)=>x.date == datetime )
    
             if(a.length > 0){
                for(let i = 0; i < a.length; i++){
                    t = t + Number(a[i].cost);
                }
             }else{
                t = 0
             }
             if(arr.length > 0){
                for(let i = 0; i < arr.length; i++){
                    t1 = t1 + Number(arr[i].cost);
                }
             }else{
                t1 = 0
             }
            
            
             setdatatoday(t)
             settotal(t1)
         }
     }

    const currencyFormat = (num1) => {
        const num = +num1
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={{ color: 'black', fontSize: 16,fontWeight:'bold'}}>Statistics of your expenses history</Text>
            <View style={{
                width:"100%",
                flexDirection:'row',
                // backgroundColor:'pink',
                paddingHorizontal: 15
            }}>
                <Text style={{ color: 'black',fontWeight:'bold', fontSize: 16, marginTop: 10}}>Total expenses today: </Text>
                <Text style={{ color: 'black', fontSize: 16, marginLeft: 10, marginTop: 10}}>{currencyFormat(datatoday)}</Text>
            </View>
            <View style={{
                width:"100%",
                flexDirection:'row',
                // backgroundColor:'pink',
                paddingHorizontal: 15
            }}>
                <Text style={{ color: 'black',fontWeight:'bold', fontSize: 16, marginTop: 10}}>Total of all expenses : </Text>
                <Text style={{ color: 'black', fontSize: 16, marginLeft: 10, marginTop: 10, marginBottom: 10}}>{currencyFormat(total)}</Text>
            </View>
        </View>
      {data.length > 0 ? 
        <ScrollView style={styles.content}>
            {data.map((value)=>{
            return(
                <View key={value.time} style={styles.item}>
                    <View style={{flexDirection: 'column', justifyContent:"space-around", width:windowW/4 -10 }}>
                        <Text style={styles.title}>Date</Text>
                        <Text style={styles.title1}>{value.date}</Text>

                    </View>
                    <View style={{flexDirection: 'column', justifyContent:"space-around", width:windowW/4 -10 }}>
                        <Text style={styles.title}>Hour</Text>
                        <Text style={styles.title1}>{value.time}</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent:"space-around", width:windowW/4 + 10}}>
                        <Text style={styles.title}>Name</Text>
                        <Text style={styles.title1}>{value.name}</Text>

                    </View>
                    <View style={{flexDirection: 'column', justifyContent:"space-around", width:windowW/4 + 10}}>
                        <Text style={styles.title}>Expense</Text>
                        <Text style={{...styles.title1, color:'red'}}>{currencyFormat(value.cost)}</Text>
                    </View>
                </View>
            )
        })}
        </ScrollView>
        : 
        <View style={{width:windowW, height:windowH, flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
            <Text style={{textAlign:"center", color:"gray"}}>
            No statistics!!
            </Text>
        </View>

        }
        

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
   container:{
        flex:1,
        backgroundColor:'white'
   },
    header:{
        width:windowW,
        backgroundColor:'white',
        padding: 5,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop: 5,
        shadowColor:'#000',
        shadowOffset:{
            width:1,
            height: 2
        },
        shadowOpacity:.5,
        shadowRadius:5,
        elevation:3
    },
    headerContent:{
        width: "100%",
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    form:{
        width: windowW,
        flexDirection:"column",
        // backgroundColor:"pink",
        padding: 5,
        flexDirection:'column',
    },
    itemForm:{
        width:'100%',
        flexDirection:"row",
        justifyContent:"flex-start",
        paddingHorizontal: 5,
        alignContent:'center',
        alignItems:'center'
    },
    titleform:{
        width: "30%",
        fontSize:16,
        fontWeight: 'bold',
        color:'black'
    },
    inputForm:{
        width: "70%",
        maxWidth: "70%",
        marginTop: 10,
        height: 40,
        borderRadius: 5,
        borderWidth:0.3,
        borderColor:'red',
        
        textAlign:'center',
      },
      btnadd:{
        width: 80,
        height: 40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:"center"  ,
        borderWidth: 1,
        marginTop: 20,
        backgroundColor:'green',
        borderColor:"white",
        borderRadius:10

        },
        content:{
            width: windowW,
        
        },
        item:{
            width:windowW,
            height: 70,
            backgroundColor:'white',
            padding: 5,
            flexDirection:'row',
            justifyContent:'flex-start',
            marginTop: 5,
            shadowColor:'#000',
            shadowOffset:{
                width:1,
                height: 2
            },
            shadowOpacity:.5,
            shadowRadius:5,
            elevation:3
        },
        title:{
            fontWeight:"bold",
            color:"black"
        },
        title1:{

        }
})
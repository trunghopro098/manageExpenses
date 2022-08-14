import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { windowW } from '../util/widthHeight'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from 'react-native-gesture-handler';

export default function SpendDetail() {
    const [date, setdate] = useState()
    const [time, settime] = useState()
    const [costName, setcostName] = useState("")
    const [cost, setCost] = useState(0)
    const [data, setdata] = useState([])
    const [showAdd, setshowAdd] = useState(true)
    const today = new Date()
    useEffect(() => {
      const datetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    setdate(datetime)
    
    }, [])

    useEffect(() => {
        getlocal()
    }, [showAdd])

    const getlocal = async()=>{
        const datetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
       const data1 =  await AsyncStorage.getItem("DATA") 
        if( data1 !== null){
            const arr = JSON.parse(data1)
            // console.log(arr)
            const a = arr.filter((x)=>x.date == datetime ).reverse()
            
            setdata(a)
        }
    }

    const currencyFormat = (num1) => {
        const num = +num1
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }
    const check = (number)=>{
        if(!/^[0-9]+$/.test(number)){
          return false
        }else{
          return true
        }
      }

    const handleAdd = async()=>{
        const time = today.getHours()+':'+(today.getMinutes())+':'+today.getSeconds()
        let arr = [];
        if(costName.trim() == "" || check(cost) == false){
            alert("Costs name of living must be entered and costs must be a number.")
        }else{
            const obj = {
                date : date,
                time: time,
                name: costName,
                cost: cost
            }
            if(data.length > 0){
                arr = data.concat([obj])
                console.log("a",arr)
            }else{
               arr = [obj];
            }
            await AsyncStorage.setItem("DATA", JSON.stringify(arr))
            // await AsyncStorage.removeItem("DATA")
            setCost('')
            setcostName('')
            setshowAdd(!showAdd)
            alert("add success !!!")
            // console.log(obj)
        }
    }
    
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
            <Text style={{
                fontSize:18,
                color:'black',
                fontWeight:'bold'
            }}>
                Enter living expense date
        
            </Text>
            <Text style={{
                fontSize:18,
                color:'red',
                fontWeight:'bold'
            }}>
                {date}
            </Text>
        </View>
        <View style={styles.form}>
            <View style={styles.itemForm}>
                <Text style={styles.titleform}>Costs Name  </Text>
                <TextInput
                style={styles.inputForm}
                  placeholder="Enter expense name"
                  onChangeText={setcostName}
                  value={costName}
                />
            </View>
            <View style={styles.itemForm}>
                <Text style={styles.titleform}>Costs </Text>
                <TextInput
                    style={styles.inputForm}
                    keyboardType="numeric"
                  placeholder="Enter cost"
                  onChangeText={setCost}
                  value={cost}
                />
            </View>
            <View style={{width:'100%',justifyContent:'center', alignItems:"center"}}>
                <TouchableOpacity style={styles.btnadd} onPress={()=>{handleAdd()}}>
                    <Text style={{fontWeight:'bold', color:'white'}}>Add</Text>
                </TouchableOpacity>
            </View>
            {data.length > 0 && 
                <View style={{width:'100%',justifyContent:'center', alignItems:"center", marginTop:20}}>
                <Text style={{fontSize: 16, fontWeight: "bold", color:'black'}}>
                Expense today
                </Text>
            </View>
            }

        </View>
      </View>
      <ScrollView style={styles.content}>
      {data.length > 0 ? 
            <>
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
        })}</>: 
            <Text style={{textAlign:"center", color:"gray", marginTop: 40}}>
            No statistics!!
            </Text>
        }
        
      </ScrollView>
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
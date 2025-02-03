import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function SeeDetails(){

    return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize:20,fontWeight:'bold',fontStyle:'italic', color:'#333'}}>See Details</Text>
        </View>
    )
}
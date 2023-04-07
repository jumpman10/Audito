import React, { useState } from 'react';
import {
    LayoutAnimation,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

interface Props {
    month: any,
    media:any,
    mes:any
  }



export const Months = ({month,media,mes}:Props) => {
    const [active, setActive] = useState(null);
    const data = media?.filter((e)=>e.fecha?.slice(3,5)===mes)
    const data2 = data?.map((e)=>Number(e.resultado_media))
    const suma = data2?.reduce((anterior, actual) => anterior + actual, 0)
    const resultadoFinal = suma/data2?.length 

    
    return (
        <View style={styles.container}>
                <Item  mes={month} 
                active={active} i={1} setActive={setActive} month={month} media={resultadoFinal} />
        </View>
    );
}
function Item({ i, active,setActive,mes,month,media }) {
    const onDropDown = () => {
        LayoutAnimation.easeInEaseOut();
        setActive(i == active ? null : i);
    };
    const open = active == i;

    return (
        <TouchableOpacity style={{
        width:'95%',  
        marginVertical:'2%', 
        borderRadius:15,
        backgroundColor:Number.isNaN(media) ===true?'grey':'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding:10}} onPress={onDropDown} activeOpacity={1}>
            <View style={styles.row}>
                <Text style={styles.text}>{mes}</Text>
            </View>
            {open &&
            <>
                <View style={styles.checkBox}>
                        <Text  style={{padding: 5,color:media<2.5?'red':'green',textAlignVertical:'center',fontSize:20}}>
                            {Number.isNaN(media) ===true?null:media.toFixed(2)}
                        </Text>
                </View>
            </>      
               }
        </TouchableOpacity>
    );
}

    


const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent:'center',
        paddingTop: 5,
    },
    item: {
        width:'95%',  
        marginVertical:'2%', 
        borderRadius:15,
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding:10
    },
    subItem: {
        padding: 5,
        color: 'black',
        textAlignVertical:'center'
    },
    row: {
        height:30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkBox:{
        height:40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    box: {
        height:30,
        width:30,
        backgroundColor:'white',
        alignSelf:'center',
        borderWidth:1,
        borderColor:'black'
    },
    check: {
        width:28,
        height:28,
        fontSize:20,
        color:'#0081A7',
        textAlign:'center',
    },
    text: {
        color:'black',
        textAlignVertical:'center'
    },
})
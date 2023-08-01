import { useNavigation } from '@react-navigation/native';
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
    name:any
    onpress:any
    title:string
  }



export const SelectLocal = ({name,onpress,title}:Props) => {
    const [active, setActive] = useState(null);

    
    return (
        <View style={styles.container}>
                <Item active={active} i={1} setActive={setActive} name={name} onpress={onpress} title={title}/>
        </View>
    );
}
function Item({ i, active,setActive, name, onpress,title }) {
    const onDropDown = () => {
        LayoutAnimation.easeInEaseOut();
        setActive(i == active ? null : i);
    };
    const open = active == i;
    const navigation = useNavigation()
    const select = (e)=>{
        onDropDown()
        onpress(e)
    }
    return (
        <TouchableOpacity 
        style={{
        width:'100%',  
        borderRadius:15,
        }}
        onPress={onDropDown} activeOpacity={1}>
            <View style={styles.row}>
                <Text style={styles.item}>{title}</Text>
            </View>
            {open &&
            <>
            { name?.map((e,i)=>
                <View style={styles.checkBox} key={i}> 
                    <TouchableOpacity onPress={()=>select(e)}
                     style={styles.touchable}>
                        <Text  style={{padding: 5,color:'green',textAlignVertical:'center',
                        fontSize:17,textDecorationLine:'underline',textDecorationStyle:'solid',}}>
                            {e}
                        </Text>
                    </TouchableOpacity> 
                </View>
                )
            }
            </>      
               }
        </TouchableOpacity>
    );
}

    


const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent:'center',
    },
    item: {
    color:'black',
    fontSize:14,
    padding:10,
    height:60,
    textAlignVertical:'center',
    textDecorationLine:'underline',
    textDecorationStyle:'solid',
    },
    subItem: {
        padding: 5,
        color: 'black',
        textAlignVertical:'center'
    },
    row: {

    },
    checkBox:{
        flexDirection: 'column',
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
    touchable:{
        marginHorizontal:1
    }
})
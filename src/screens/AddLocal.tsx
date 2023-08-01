import React, { useEffect, useState } from 'react'
import { View, Image,ToastAndroid ,TouchableOpacity,Text, StyleSheet, FlatList, TextInput, ScrollView, Modal } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { useGetAllListsQuery, usePostLocalMutation} from '../services/api/api';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './LoadingScreen';
import { useForm } from '../hooks/useForm';
import { Buttons } from '../componentes/Buttons';

interface Props extends StackScreenProps <any , any>{};

export const AddLocal = ({navigation,route}  : Props) => {

const [postLocal,{isSuccess:suceso, error:error2,isLoading}] = usePostLocalMutation()

const { name, onChange, location,provincia,localidad} = useForm({
        name: '',
        location: '',
        provincia:'',
        localidad:''
      });
const [item,setItem]=useState('')

const data = {name:name, location:[location], provincia:provincia, localidad:localidad,item:item}
const send = () =>{
        postLocal(data)
}
if(suceso && !isLoading){
  navigation.replace('AddLocalAccount', {type:'local',name:name})
  ToastAndroid.showWithGravity(
    'Local agregado correctamente',
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
}
const verify = [name,location,provincia,localidad,item]
function check(e:any) {
  return e.length > 0;
}
const [modalVisible, setModalVisible] = useState(false);

return (
      <ScrollView contentContainerStyle={{flex:1}}>
        {isLoading?
        <View style={{flex:1}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} 
        style={{justifyContent:'center',height:70,
        alignItems:'center',position:'absolute',left:15,zIndex:1000, top:0}}>
          <Icon 
            name="arrow-back"
            color="#FF914D"
            size={ 35 }
          />
        </TouchableOpacity>
        <LoadingScreen/>
        </View>
        :
        <ScrollView contentContainerStyle={{alignItems:'center',justifyContent:'center',flex:1}}>
        <Text style={{textAlignVertical:'center',height:70,color:'black',textAlign:'center',}}>Agregar</Text>
        <View style={styles.container}>
            <Text style={styles.text}>Nombre</Text>
            <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={ (value) => onChange( value, 'name' ) }
            value={name}
            placeholderTextColor='gray'
            >
            </TextInput>
        </View>
        <View style={styles.container}>
            <Text style={styles.text}>Rubro</Text>
            {
            item.length===0 ?
            <TouchableOpacity onPress={()=> setModalVisible(true)}>
                <Text style={styles.item}>Selecciona el rubro</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=> setModalVisible(true)}>
                <Text style={styles.textresp}>{item}</Text>
            </TouchableOpacity>
            }
        </View>
        <View style={styles.container}>
            <Text style={styles.text}>Dirección</Text>
            <TextInput
            style={styles.input}
            placeholder="Dirección"
            onChangeText={ (value) => onChange( value, 'location' ) }
            value={location}
            placeholderTextColor='gray'
            >
            </TextInput>
        </View>
        <View style={styles.container}>
            <Text style={styles.text}>Provincia</Text>
            <TextInput
            style={styles.input}
            placeholder="Provincia"
            onChangeText={ (value) => onChange( value, 'provincia' ) }
            value={provincia}
            placeholderTextColor='gray'
            >
            </TextInput>
        </View>
        <View style={styles.container}>
            <Text style={styles.text}>Ciudad</Text>
            <TextInput
            style={styles.input}
            placeholder="Ciudad"
            onChangeText={ (value) => onChange( value, 'localidad' ) }
            value={localidad}
            placeholderTextColor='gray'
            >
            </TextInput>
        </View>
        <View style={{marginTop:15}}>
        {verify.every(check)===true ?
               <Buttons text='Siguiente' onPress={()=>send()}/>
               :
               <Text style={styles.subs}>Completa los campos</Text>
        }
            
        </View>

        <Modal 
         animationType="fade"
         transparent={true}
         visible={modalVisible}>
         <View style={styles.centeredView}>
           <View style={styles.modalView}>
             <Text style={styles.modalText}>{item}</Text>
             <TouchableOpacity
               style={styles.button2}
               onPress={() =>setItem('Gastronomía')}>
               <Text style={styles.textStyle}>Gastronomía</Text>
             </TouchableOpacity>
             <TouchableOpacity
               style={styles.button2}
               onPress={() =>setItem('Indumentaria')}>
               <Text style={styles.textStyle}>Indumentaria</Text>
             </TouchableOpacity>
             <TouchableOpacity
               style={styles.button2}
               onPress={() =>setItem('Librería')}>
               <Text style={styles.textStyle}>Librería</Text>
             </TouchableOpacity>
             <TouchableOpacity
               style={styles.button2}
               onPress={() =>setItem('Sommiers, Colchones y Deco')}>
               <Text style={styles.textStyle}>Sommiers, Colchones y Deco</Text>
             </TouchableOpacity>
             <TouchableOpacity
               style={styles.button}
               onPress={() =>setModalVisible(false)}>
               <Text style={styles.textStyle}>Listo</Text>
             </TouchableOpacity>
           </View>
         </View>
        </Modal>
        </ScrollView>
        }
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{    
    width:'90%', 
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
      elevation: 5
  },
  buttons:{   
      width:'90%',  
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
  text:{
    color:'white',fontSize:20,fontStyle:'italic',
    textAlign:'center',textDecorationLine:'underline',backgroundColor:'#FF914D',
    borderTopLeftRadius:15,borderTopRightRadius:15,height:45,textAlignVertical:'center'
  },
  input:{
    width:'100%',
    height: 40,
    marginVertical: 15,
    paddingHorizontal: 10,
    paddingVertical:10,
    color:'black',
    fontSize:15
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor:'rgba(255, 255, 255, 0.7)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor:'#DDDDDD',
    borderWidth:0.5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color:'black'
  },
  button2: {
    width: 200,
    height: 50,
    borderRadius:20,
    backgroundColor:'green',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:'2%',
  },
  button3:{
    width: 50,
    height: 50,
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:'2%',
    left:'2%'
  },
  buttonOpen: {
    backgroundColor: 'green',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button:{
    width: 250,
    height: 50,
    borderRadius:20,
    backgroundColor:'#FF914D',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:'2%',
  },
  item:{
    color:'black',
    fontSize:14,
    padding:10,
    height:60,
    textAlignVertical:'center',
    textDecorationLine:'underline',
    textDecorationStyle:'solid',
  },
  textresp:{
    padding:10,
    fontSize:15,
    color:'black',
    height: 60,
    textAlignVertical:'center'
  },
  subs:{
    color:'orange',
    textAlign:'center',
    width:'75%',
    padding:5,
    fontSize:15,
    fontStyle:'italic'
  },
})
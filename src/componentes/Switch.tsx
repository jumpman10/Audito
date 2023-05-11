import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    LayoutAnimation,
    Platform,
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
const activeColor = 'green';
const inActiveColor = 'grey';

interface Props{
    states:boolean,
}

export default function Switch({states}:Props) {
    const [state,setState] = useState (states)
    const [toggleActive, setToggle] = useState(state);
    return (
        <View style={styles.constainer}>
            <TouchableOpacity
                style={[
                    styles.toggleContainer,
                    { backgroundColor: toggleActive ? activeColor : inActiveColor },
                ]}
                onPress={() => {
                    LayoutAnimation.easeInEaseOut();
                    setToggle(!toggleActive)  
                    if (toggleActive === true){
                        setState(false)
                    }else if (toggleActive === false){
                        setState(true)  
                    }
            
                }}
                activeOpacity={1}>
                <View
                    style={[
                        styles.toggleBtn,
                        toggleActive
                            ? { backgroundColor: 'white', alignSelf: 'flex-end' }
                            : { backgroundColor: 'white' },
                    ]}
                />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    constainer: { alignItems: 'center', justifyContent: 'center',},
    status: {
        width: 100,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    toggleContainer: {
        height: 20,
        width: 40,
        borderRadius: 40,
        borderWidth: 0.5,
        overflow: 'hidden',
    },
    toggleBtn: { height: '100%', width: '50%', borderRadius:40},
});
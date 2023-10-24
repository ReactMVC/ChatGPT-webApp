import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ChatGPT</Text>
            <Text style={styles.subtitle}>open source chatbot app</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}>
                    <Icon name="comments" size={20} color="#000" />
                    <Text style={styles.buttonText}>Open ChatGPT</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DarkGPT')}>
                    <Icon name="bug" size={20} color="#000" />
                    <Text style={styles.buttonText}>Open DarkGPT</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://github.com/ReactMVC/ChatGPT-Client')}>
                    <Icon name="github" size={20} color="#000" />
                    <Text style={styles.buttonText}>Github Page</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://myket.ir/app/com.chatgpt.pira')}>
                    <Icon name="android" size={20} color="#000" />
                    <Text style={styles.buttonText}>Android App</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('API')}>
                    <Icon name="code" size={20} color="#000" />
                    <Text style={styles.buttonText}>API Docs</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.footer}>Developer: Hossein Pira</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 20,
        marginTop: '10px',
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ddd',
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 20,
        marginLeft: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 10,
    },
});

export default Home;

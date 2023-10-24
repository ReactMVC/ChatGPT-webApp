import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, Text, Appearance } from 'react-native';
import { GiftedChat, Bubble, Send, Time, InputToolbar, Composer } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';
import localForage from 'localforage';

export default function DarkGPT() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

    useEffect(() => {
        retrieveMessages();
        retrieveMode();
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setIsDarkMode(colorScheme === 'dark');
        });
        return () => subscription.remove();
    }, []);

    useEffect(() => {
        storeMessages(messages);
        storeMode(isDarkMode);
    }, [messages, isDarkMode]);

    const retrieveMessages = async () => {
        try {
            const storedMessages = await localForage.getItem('darkmessages');
            if (storedMessages !== null) {
                setMessages(storedMessages);
            }
        } catch (error) {
            console.error('Failed to retrieve messages', error);
        }
    };

    const storeMessages = async (messages) => {
        try {
            await localForage.setItem('darkmessages', messages);
        } catch (error) {
            console.error('Failed to store messages', error);
        }
    };


    const retrieveMode = async () => {
        try {
            const storedMode = await localForage.getItem('mode');
            if (storedMode !== null) {
                setIsDarkMode(storedMode === 'dark');
            }
        } catch (error) {
            console.error('Failed to retrieve mode', error);
        }
    };

    const storeMode = async (mode) => {
        try {
            await localForage.setItem('mode', mode ? 'dark' : 'light');
        } catch (error) {
            console.error('Failed to store mode', error);
        }
    };

    const onSend = async (newMessages = []) => {
        if (newMessages[0].text.trim() === '') {
            alert('Message cannot be empty');
            return;
        }

        setIsLoading(true);
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

        try {
            const response = await fetch('https://chatgpt-darkapi2.onrender.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ text: newMessages[0].text }),
            });

            if (response.ok) {
                const data = await response.json();
                const botResponse = {
                    _id: Math.random().toString(36).substring(7),
                    text: data.message,
                    createdAt: new Date().toISOString(),
                    user: {
                        _id: 2,
                        name: 'ChatGPT',
                    },
                };
                setIsLoading(false);
                setMessages(previousMessages => GiftedChat.append(previousMessages, botResponse));
            } else {
                throw new Error('Failed to get response from chatbot');
            }
        } catch (error) {
            setIsLoading(false);
            alert('Error: ' + error.message);
            const errorMessage = {
                _id: Math.random().toString(36).substring(7),
                text: 'Failed to send message. Please try again.',
                createdAt: new Date().toISOString(),
                user: {
                    _id: 2,
                    name: 'ChatGPT',
                },
            };
            setMessages(previousMessages => GiftedChat.append(previousMessages, errorMessage));
        }
    };

    const deleteChat = () => {
        const confirmation = window.confirm('Are you sure you want to delete this chat?');
        if (confirmation) {
            try {
                localForage.removeItem('darkmessages').then(() => {
                    setMessages([]);
                }).catch((error) => {
                    console.error('Failed to delete chat', error);
                });
            } catch (error) {
                console.error('Failed to delete chat', error);
            }
        }
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: isDarkMode ? '#3c3f42' : '#000',
                    },
                }}
                textStyle={{
                    right: {
                        color: isDarkMode ? '#fff' : '#fff',
                    },
                }}
                timeTextStyle={{
                    right: {
                        color: 'rgba(255,255,255,0.5)',
                    },
                }}
            />
        );
    };

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <ActivityIndicator size="small" color="#007aff" />
                </View>
            </Send>
        );
    };

    const renderLoading = () => {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007aff" />
            </View>
        );
    };

    const renderTime = (props) => (
        <Time
            {...props}
            timeTextStyle={{
                left: {
                    color: 'grey',
                },
                right: {
                    color: 'grey',
                },
            }}
            format='HH:mm'
        />
    );

    const renderInputToolbar = (props) => (
        <InputToolbar
            {...props}
            containerStyle={{
                backgroundColor: isDarkMode ? '#41444a' : '#fff',
                borderTopColor: isDarkMode ? '#fff' : '#000',
                borderTopWidth: 1,
            }}
        />
    );

    const renderComposer = (props) => (
        <Composer
            {...props}
            textInputStyle={{
                color: isDarkMode ? '#fff' : '#000',
                backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
                paddingTop: 12,
                paddingBottom: 12,
                paddingHorizontal: 12,
                marginLeft: 0,
            }}
        />
    );

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#000' }]}>Evil Chat GPT</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={deleteChat}>
                        <Icon name="trash-outline" size={24} color={isDarkMode ? '#fff' : '#000'} />
                    </TouchableOpacity>
                </View>
            </View>
            <GiftedChat
                messages={messages}
                onSend={newMessages => onSend(newMessages)}
                user={{
                    _id: 1,
                }}
                renderBubble={renderBubble}
                renderSend={isLoading ? renderSend : null}
                renderLoading={renderLoading}
                renderTime={renderTime}
                renderInputToolbar={renderInputToolbar}
                renderComposer={renderComposer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
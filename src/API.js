import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';

const APICard = ({ endpoint, method, headers, body }) => {
    const copyToClipboard = () => {
        const apiData = `Endpoint: ${endpoint}\nMethod: ${method}\nHeaders: ${JSON.stringify(headers, null, 2)}\nBody: ${JSON.stringify(body, null, 2)}`;
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(apiData).then(function () {
                alert("API data copied to clipboard!");
            }).catch(function (err) {
                alert('Could not copy text: ', err);
            });
        } else {
            Clipboard.setString(apiData);
            alert("API data copied to clipboard!");
        }
    };


    return (
        <Card style={styles.card}>
            <Card.Content>
                <Title style={styles.endpoint}>Endpoint: {endpoint}</Title>
                <Paragraph style={styles.method}>Method: {method}</Paragraph>
                <Paragraph style={styles.headers}>Headers: {JSON.stringify(headers, null, 2)}</Paragraph>
                <Paragraph style={styles.body}>Body: {JSON.stringify(body, null, 2)}</Paragraph>
                <Button mode="contained" onPress={copyToClipboard} style={{ alignSelf: 'flex-start', marginTop: 10 }}>Copy API</Button>
            </Card.Content>
        </Card>
    );
};


export default function API() {

    const apiData = {
        endpoint: 'https://chatgpt-api3.onrender.com',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: {
            "text": "Hello ChatGPT"
        },
    };

    const evilData = {
        endpoint: 'https://chatgpt-darkapi2.onrender.com',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: {
            "text": "Hello DarkGPT"
        },
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ChatGPT 3.5 API</Text>
            <APICard {...apiData} />
            <Text style={styles.title}>ChatGPT Evil API</Text>
            <APICard {...evilData} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    card: {
        margin: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
    },
    endpoint: {
        color: '#1976d2',
        fontFamily: 'monospace',
    },
    method: {
        color: '#388e3c',
        fontFamily: 'monospace',
    },
    headers: {
        color: '#f57c00',
        fontFamily: 'monospace',
    },
    body: {
        color: '#5d4037',
        fontFamily: 'monospace',
    },
});

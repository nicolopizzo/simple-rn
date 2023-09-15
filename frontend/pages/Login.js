import axios from "axios";
import { useState } from "react";
import { Button, Text, TextInput } from "@react-native-material/core"
import { Alert, Image, SafeAreaView, StyleSheet, View } from "react-native";
import { ip } from "../config";

export default function Login({ navigation, route }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onLogin = async () => {
        const url = `http://${ip}:8080/login`;
        try {
            const response = await axios.post(url, { username, password })
            const { username, role } = response.data;

            navigation.navigate('Home', { user: { username, role } });
            setUsername("");
            setPassword("");
        } catch (error) {
            Alert.alert("Error logging in.")
        }

    }

    return (
        <View style={styles.container}>
            {/* <View style={{ alignItems: 'center', marginBottom: 50 }}>
                <Image style={{ width: 243, height: 62 }} source={require("../assets/logox4.png")} />
            </View> */}
            <Text style={styles.title}>
                Please insert your credentials
            </Text>
            <SafeAreaView>
                <TextInput
                    style={{ margin: 6 }}
                    label="username"
                    onChangeText={text => setUsername(text)}
                    variant="outlined"
                    value={username}
                />

                <TextInput
                    style={{ margin: 6 }}
                    label="password"
                    variant="outlined"
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
            </SafeAreaView>

            <Button
                style={{ margin: 6 }}
                onPress={onLogin}
                title="Sign in" />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 22,
        marginBottom: 6
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
});
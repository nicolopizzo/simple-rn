import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ip } from "../config";
import { ListItem, Button, Text, TextInput, } from "@react-native-material/core";

export default function UserHome({ navigation, route }) {
    const { user } = route.params;
    const { username } = user;
    const [interests, setInterests] = useState([]);
    const [newInterest, setNewInterest] = useState("");
    const onAddNewInterest = () => {
        setInterests([...interests, newInterest]);
        const url = `http://${ip}:8080/interests?username=${username}&interest=${newInterest}`
        axios.post(url);

        setNewInterest("");
    }



    useEffect(() => {
        const getInterests = async () => {
            const url = `http://${ip}:8080/interests/${username}`
            const res = await axios.get(url);
            const data = res.data;

            if (res.status >= 400 || data == undefined) {
                setInterests([])
            } else {
                setInterests(data)
            }
        }

        getInterests();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title} >Hello {username}</Text>
            {interests.length <= 0 ?
                <Text style={styles.subtitle}>You haven't added any interest.</Text> :
                <>
                    <Text style={styles.subtitle}>These are your interests.</Text>
                    <>
                        {interests.map(i => <ListItem title={i} />)}
                    </>
                </>
            }

            <View style={{ marginTop: 16 }}>
                <TextInput label="New Interest" variant="outlined" style={styles.input} value={newInterest} onChangeText={text => setNewInterest(text)} />
                <Button onPress={onAddNewInterest} title="Add interest" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24
    },
    subtitle: {
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 18
    }
});
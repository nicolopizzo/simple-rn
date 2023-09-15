import { useEffect, useState } from "react";
import { ListItem, Button, Dialog, DialogHeader, DialogContent, DialogActions, Text, Provider, TextInput } from "@react-native-material/core"
import { Alert, StyleSheet, View } from "react-native";
import { ip } from "../config";
import axios from "axios";

export default function AdminHome({ navigation, route }) {
    const { user } = route.params;
    const { username } = user;

    const [users, setUsers] = useState([])
    const [editUser, showEditUser] = useState(false)
    const [createUser, showCreateUser] = useState(false)

    const [newUsername, setNewUsername] = useState("")
    const [newRole, setNewRole] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const [selectedUser, setSelectedUser] = useState("")
    const [selectedRole, setSelectedRole] = useState("")

    const setSelection = (user) => {
        setSelectedUser(user.username);
        setSelectedRole(user.role)
    }

    const getUsers = async () => {
        try {

            const url = `http://${ip}:8080/`

            const response = await axios.get(url);
            console.log(response);
            if (response.data != undefined) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Something went wrong in retreiving users.")
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Provider>

            <Text style={styles.title}> Hello admin {username}</Text>

            <Text style={styles.subtitle}> these are the users of the app </Text>
            <>
                {users.map(u => <ListItem title={u.username} secondaryText={`Role: ${u.role}`} onPress={() => { setSelection(u); showEditUser(true) }} />)}
            </>

            <Button style={{ margin: 16 }} title="Create new user" onPress={() => { showCreateUser(true) }} />
            {/* // </View> */}

            <Dialog visible={createUser} onDismiss={() => showCreateUser(false)}>
                <DialogHeader title="Create a new user" />
                <DialogContent>
                    <Text>Insert the credentials for the new user</Text>
                    <TextInput style={{ marginBottom: 10 }} variant="outlined" label="username" value={newUsername} onChangeText={text => setNewUsername(text)} />
                    <TextInput style={{ marginBottom: 10 }} variant="outlined" label="password" value={newPassword} onChangeText={text => setNewPassword(text)} />
                    <TextInput style={{ marginBottom: 10 }} variant="outlined" label="role" value={newRole} onChangeText={text => setNewRole(text)} />
                </DialogContent>
                <DialogActions>
                    <Button
                        title="Cancel"
                        compact
                        variant="text"
                        onPress={() => {
                            showCreateUser(false)
                            setNewUsername("")
                            setNewPassword("")
                            setNewRole("")
                        }}
                    />
                    <Button
                        title="Ok"
                        compact
                        variant="text"
                        onPress={() => {
                            const url = `http://${ip}:8080/`
                            const newUser = { username: newUsername, password: newPassword, role: newRole }
                            axios.put(url, newUser)
                            setUsers([...users, newUser])
                            setNewUsername("")
                            setNewPassword("")
                            setNewRole("")
                            showCreateUser(false)
                        }}
                    />
                </DialogActions>
            </Dialog>

            {/* Edit user role */}
            <Dialog visible={editUser} onDismiss={() => showEditUser(false)}>
                <DialogHeader title={`Edit role for ${selectedUser}`} />
                <DialogContent>
                    <TextInput style={{ marginBottom: 10 }} variant="outlined" label="role" value={selectedRole} onChangeText={text => setSelectedRole(text)} />
                </DialogContent>
                <DialogActions>
                    <Button
                        title="Cancel"
                        compact
                        variant="text"
                        onPress={() => {
                            showEditUser(false)
                        }}
                    />
                    <Button
                        title="Ok"
                        compact
                        variant="text"
                        onPress={() => {
                            const url = `http://${ip}:8080/role?username=${selectedUser}&role=${selectedRole}`
                            console.log(url);
                            axios.post(url)
                            let newUsers = users;
                            let i = newUsers.findIndex((u) => u.username == selectedUser)
                            newUsers[i].role = selectedRole
                            setUsers(newUsers)

                            setSelectedUser("")
                            setSelectedRole("")
                            showEditUser(false)
                        }}
                    />
                </DialogActions>
            </Dialog>
        </Provider>
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
        fontSize: 18,
        marginBottom: 10
    }
});
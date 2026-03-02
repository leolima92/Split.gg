import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { playerService } from '../services/playerService';

function AddPlayerScreen() {
    const db = useSQLiteContext(); 
    const [nickname, setNickname] = useState('');
    const [rank, setRank] = useState('');

    const handleAdd = async () => {
        if (!nickname || !rank) {
        alert("Por favor, preencha todos os campos.");
        return;
        }

        try {
        await playerService.create(db, { nickname, rank, role: 'Flex' });
        alert("Jogador cadastrado com sucesso!");
        setNickname('');
        setRank('');
        } catch (error) {
        alert("Erro ao salvar no banco.");
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.label}>Nickname</Text>
        <TextInput style={styles.input} value={nickname} onChangeText={setNickname} placeholder="Ex: Baiano" placeholderTextColor="#666" />

        <Text style={styles.label}>Rank (Nível de habilidade)</Text>
        <TextInput style={styles.input} value={rank} onChangeText={setRank} placeholder="Ex: 10" keyboardType="numeric" placeholderTextColor="#666" />

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>CADASTRAR JOGADOR</Text>
        </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#121212', justifyContent: 'center' },
    label: { color: '#00ff00', marginBottom: 5, fontWeight: 'bold' },
    input: { backgroundColor: '#1e1e1e', color: '#fff', padding: 15, borderRadius: 8, marginBottom: 20 },
    button: { backgroundColor: '#00ff00', padding: 15, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 }
    });

export default AddPlayerScreen;
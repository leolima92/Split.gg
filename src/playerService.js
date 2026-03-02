import * as SQLite from 'expo-sqlite';


const playerService = {

async create(db, { nickname, rank, role }) {
        try {
        const result = await db.runAsync(
            'INSERT INTO players (nickname, rank, role) VALUES (?, ?, ?)',
            [nickname, parseInt(rank), role]
        );
        return result.lastInsertRowId;
        } catch (error) {
        console.error("Erro ao inserir jogador:", error);
        throw error;
        }
    },


    async getAll(db) {
        try {
        return await db.getAllAsync('SELECT * FROM players ORDER BY nickname ASC');
        } catch (error) {
        console.error("Erro ao buscar jogadores:", error);
        return [];
        }
    }
    };

export default playerService;
import {User} from "discord.js";
import {Player} from "../models/Player";
import pool from "../database";
import {ResultSetHeader} from "mysql2";
import {ICON_ROLES, ROLES, ROLES_IDS} from "../const";

export class databaseService {
    static async createPlayer(user: User) {
        const query = `INSERT INTO players (name, elo, id_discord) VALUES ('${user.username}', 1000, '${user.id}')`
        try {
            const  [result]  = await pool.query(query);
            const { insertId } = result as ResultSetHeader;
            const saved = {
                id: insertId,
                name: user.username,
                elo: 1000,
                id_discord: user.id
            };
            console.log(`Player ${saved.name} saved on database correctly with id ${saved.id}`)
            return saved;
        }
        catch (error) {
            console.error(error)
        }
    }
    static async createTeamPlayer(player:any) {
        const query = `INSERT INTO team_players (id_team, id_role, id_player) VALUES ('${player.id_team}','${player.id_role}','${player.id_player}')`
        try {
            const  [result]  = await pool.query(query);
            const { insertId } = result as ResultSetHeader;
            return insertId;
        }
        catch (error) {
            console.error(error)
        }
    }


    static async findPlayer(id_discord): Promise<Player> {
        const query = `SELECT * FROM players WHERE id_discord = ? LIMIT 1`
        const [rows] = await pool.query(query, [id_discord]);

        return rows[0]
    }

    static async createTeam(players: Player[]){
        let teamElo = players.reduce((acc, player) => { return acc + player.elo }, 0);
        teamElo = teamElo / 5;
        const query = `INSERT INTO teams (elo) VALUES ('${teamElo}')`
        try {
            const  [result]  = await pool.query(query);
            const { insertId } = result as ResultSetHeader;
            return insertId;
        }
        catch (error) {
            console.error(error)
        }
    }

    static async createMatch(players: Player[]) {
        const blueTeam = players.filter(player => player.team === 'BLUE');
        const redTeam = players.filter(player => player.team === 'RED');

        const blueTeamId = await this.createTeam(blueTeam);
        const redTeamId = await this.createTeam(redTeam);

        for (const player of blueTeam) {
            const teamPlayer = {
                id_team:blueTeamId,
                id_role:ROLES_IDS[player.role],
                id_player:player.id
            }
            await this.createTeamPlayer(teamPlayer)
        }

        for (const player of redTeam) {
            const teamPlayer = {
                id_team:redTeamId,
                id_role:ROLES_IDS[player.role],
                id_player:player.id
            }
            await this.createTeamPlayer(teamPlayer)
        }

        const query = `INSERT INTO matches (id_team_blue, id_team_red, id_team_winner) VALUES ('${blueTeamId}','${redTeamId}','${redTeamId}')`
        try {
            const  [result]  = await pool.query(query);
            const { insertId } = result as ResultSetHeader;
            console.log(`Match created on database correctly with id ${insertId}`)
            return insertId;
        }
        catch (error) {
            console.error(error)
        }
    }
}
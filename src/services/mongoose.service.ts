import {User} from "discord.js";
import {MatchModel} from "../schemas/matchSchema";
import {PlayerModel} from "../schemas/playerSchema";
import {Player} from "../models/Player";

export class mongooseService {
    static async createPlayer(user: User) {
        const player = new PlayerModel({
            name: user.username,
            elo: 1000,
            games: 0,
            wins: 0,
            loses: 0,
            discordId: user.id,
        });

        try {
            await player.save();
            return true
        } catch (err) {
            if (err.code === 11000) {
                console.log(err)
                return false
            }
            console.log(err)
        }
    }

    static findPlayer(user: User): Promise<Player> {
        return PlayerModel.findOne({discordId: user.id})

    }

    static async createMatch(players: any): Promise<boolean> {
        const match = new MatchModel({
            players: players,
        });

        try {
            await match.save();
            return true
        } catch (err) {
            console.log(err)

            if (err.code === 11000) {
                return false
            }
        }
    }
}
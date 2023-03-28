import {Player} from "../schemas/playerSchema";
import {User} from "discord.js";

export class mongooseService{
    static async createPlayer(user: User) {
        const player = new Player({
            name: user.username,
            elo: 1000,
            games: 0,
            wins: 0,
            loses: 0,
            discordId: user.id,
        });

        try{
            await player.save();
            return true
        }
        catch (err) {
            if(err.code === 11000){
                console.log(err)
                return false
            }
            console.log(err)
        }
    }

    static async findPlayer(user: User) {
        const player = await Player.findOne({discordId: user.id})
        if(player){
            return player
        }
        return false
    }
}
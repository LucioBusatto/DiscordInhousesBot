import {Player} from "./Player";
import {discordService} from "../services/discord.service";
import {shuffleArray} from "../helpers/helpers";

export class Match {
    players: Player[];

    constructor(players: Player[]) {
        this.players = players;
        this.assignTeams()
        discordService.sendNewLobbyMessage(this.players)
    }

    assignTeams() {

        this.players = shuffleArray(this.players);

        const blueRoles = {};
        const redRoles = {};

        for (const player of this.players) {
            const { role } = player;
            if (!blueRoles[role]) {
                player.team = 'BLUE';
                blueRoles[role] = player;
            } else{
                player.team = 'RED';
                redRoles[role] = player;
            }
        }
    }
}
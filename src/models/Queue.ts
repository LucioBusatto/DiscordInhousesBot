import {PLAYERS_PER_ROLE, ROLES} from "../const";
import {Match} from "./Match";
import {playersMock} from "../mock";

export class Queue {
    players: any;

    constructor() {
        this.players = [];
        this.mockQueue();
    }

    /**
     * @return bool value whether the player was added or not
     * */
    addPlayer(player: any, role) {
        const playerInQueue = this.players.some(p => p.discordId === player.discordId)
        if (playerInQueue) {
            return false;
        }

        const playerForQueue = {
            name: player.name,
            discordId: player.discordId,
            elo: player.elo,
            role: role,
            ready: false
        }

        this.players.push(playerForQueue);
        if (this.canCreateMatch()) {
            const matchPlayers = this.createMatchPlayersArray();
            new Match(matchPlayers);
        }

        return true
    }

    removePlayer(player: any) {
        const playerInQueue = this.players.some(p => p.discordId === player.discordId)
        if (playerInQueue) {
            this.players = this.players.filter(p => p.discordId !== player.discordId);
            return true
        }

        return false
    }

    canCreateMatch(): boolean {
        ROLES.forEach((role) => {
            const playersWithRole = this.players.filter(player => this.players[player] == role);
            if (playersWithRole.length < PLAYERS_PER_ROLE) {
                return false;
            }
        });

        return true;
    }

    createMatchPlayersArray(): any[] {
        const matchPlayers: any[] = [];
        for (const role of ROLES) {
            const playersWithRole = this.players.filter(player => player.role == role);
            matchPlayers.push(...playersWithRole.slice(0, PLAYERS_PER_ROLE));
        }
        return matchPlayers;
    }

    private mockQueue() {
        this.players = playersMock;
    }
}
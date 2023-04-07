import {PLAYERS_PER_ROLE, ROLES} from "../const";
import {Match} from "./Match";
import {playersMock} from "../mock";
import {filteredArray} from "../helpers/helpers";

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
        const playerInQueue = this.players.some(p => p.id_discord === player.id_discord)
        if (playerInQueue) {
            return false;
        }

        const playerForQueue = {
            id: player.id,
            name: player.name,
            id_discord: player.id_discord,
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
        const playerInQueue = this.players.some(p => p.id_discord === player.id_discord)
        if (playerInQueue) {
            this.players = this.players.filter(p => p.id_discord !== player.id_discord);
            return true
        }

        return false
    }

    canCreateMatch(): boolean {
        let canCreate = true;
        ROLES.forEach((role) => {
            const playersWithRole = this.players.filter(player => player.role == role);
            if (playersWithRole.length < PLAYERS_PER_ROLE) {
                canCreate = false;
            }
        });


        return canCreate;
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

    deletePlayers(players){
        this.players = filteredArray(this.players, players);
    }
}
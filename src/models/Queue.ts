export class Queue {
    players: any;
    constructor() {
        this.players = [];
    }

    addPlayer(player:any){
        const playerInQueue = this.players.some(p => p.discordId === player.discordId)
        if(!playerInQueue){
            this.players.push(player);
            return true
        }
        return false
    }

    removePlayer(player:any){
        const playerInQueue = this.players.some(p => p.discordId === player.discordId)
        if(playerInQueue) {
            this.players = this.players.filter(p => p.discordId !== player.discordId);
            return true
        }
        return false
    }
}
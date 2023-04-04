import mongoose from 'mongoose';
const { Schema } = mongoose;

// TODO: Implement typing
const matchSchema = new Schema<any>({
    players:[{
        type: String
    }],
    winner: String
});

export const MatchModel = mongoose.model('Match', matchSchema);

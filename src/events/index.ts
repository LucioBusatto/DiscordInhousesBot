import { ready } from "./ready";
import { interactionCreate } from "./interactionCreate";
import { messageReactionAdd } from "./messageReactionAdd";

export const uniqueEvents: any = [ready];
export const nonUniqueEvents: any = [interactionCreate, messageReactionAdd];

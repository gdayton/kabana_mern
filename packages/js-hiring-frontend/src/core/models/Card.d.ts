import Status from "./Status";

export default interface Card {
    _id: any;
    readonly createdAt?: string;
    readonly updatedAt?: string;
    
    title: string;
    description: string;
    status: Status;
    story_points: number;
}
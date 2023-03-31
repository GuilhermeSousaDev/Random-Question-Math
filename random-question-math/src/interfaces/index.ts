export interface IData {
    id: string;
    hitsPitagoras: number;
    user: {
        id: string;
        name: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
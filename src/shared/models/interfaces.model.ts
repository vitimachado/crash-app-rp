export interface IGameStats {
    over?: boolean;
    nextLevel?: boolean;
    level?: number;
    maxLife?: number;
    score?: number;
    speed?: number;
    enemiesNumber?: number;
    maxScore?: number;
}

export interface IPlayer {
    children: any;
    imageURL: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    wrap?: any;
    update?: (sprite:any, delta: number, app?: any) => void;
    stats?: IGameStats;
    setGameStats?: (o: IGameStats) => void;
};
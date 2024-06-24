export type GetFollowingResultType = {
    createdAt: Date;
    following: {
        username: string;
        id: string;
    };
}[]
export type GetFollowersResultType = {
    createdAt: Date;
    follower: {
        id: string;
        username: string;
    };
}[]
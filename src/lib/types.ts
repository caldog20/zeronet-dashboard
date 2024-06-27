export type Peer = {
    id: number,
    hostname: string,
    ip: string,
    endpoint: string,
    prefix: string,
    user: string,
    machineId: string,
    connected: boolean,
    disabled: boolean,
    lastLogin: string,
    lastAuth: string,
    createdAt: string,
    updatedAt: string,
};

export type PeerList = {
    peers: Peer[],
};

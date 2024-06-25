export type Peer =  {
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

// message PeerDetails {
//     uint32 id = 1;
//     string public_key = 2;
//     string hostname = 3;
//     string ip = 4;
//     string endpoint = 5;
//     string prefix = 6;
//     string user = 7;
//     bool connected = 8;
//     string machine_id = 9;
//     bool disabled = 10;
//     string last_login = 11;
//     string last_auth = 12;
//     string created_at = 13;
//     string updated_at = 14;
// }
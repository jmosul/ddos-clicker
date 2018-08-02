import Hardware from '@/config/HardwareConfig';
import ServerModel from '@/models/ServerModel';
import IdGenerator from '@/services/ModelIdGenerator';

export default class ServersResource {
    private servers: Array<ServerModel> = [];

    public constructor() {
        this.servers = Hardware.servers.map(serverId => ServersResource.serverFactory(serverId));
    }

    /**
     * @param {number} researchPoints
     * @return {ServerModel[]}
     */
    public getAvailableServers(researchPoints: number) {
        return this.servers.filter(server => server.researchCost <= researchPoints);
    }

    /**
     * @param {string} id
     * @constructor
     */
    public static serverFactory(name: string) {
        const id = IdGenerator.next();
        const server = new ServerModel(id, name);
        const parsedId = ServersResource.parseId(name);

        server.strength = Hardware.getStrength(parsedId.strengthKey);
        server.requestsPerSecond = Hardware.clicksPerSecondMultiplier * parsedId.number;
        server.capacity = Hardware.getCapacity(parsedId.size);
        server.researchCost = Hardware.getResearchMultiplier(parsedId.size) * parsedId.number;

        return server;
    }

    /**
     * @param {string} id
     * @return {{strengthKey: string; number: number; size: string}}
     */
    private static parseId(id: string) {
        return {
            strengthKey: id.charAt(0),
            number: parseInt(id.charAt(1)),
            size: id.split(' ')[1]
        }
    }
}
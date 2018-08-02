export default interface ServerRackDetails {
    id: number,
    name?: string,
    strength: number,
    requestsPerSecond: number,
    capacity: number
}
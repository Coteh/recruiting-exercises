export type ItemMap = {
    [itemName: string]: number
}
export type Warehouse = {
    name: string,
    inventory: ItemMap
}
export type AllocatedShipment = {
    [warehouseName: string]: ItemMap
}

export class InventoryAllocator {
    private ordersMap: ItemMap;
    private warehousesArr: Warehouse[];

    constructor(ordersMap: ItemMap, warehousesArr: Warehouse[]) {
        this.ordersMap = ordersMap;
        this.warehousesArr = warehousesArr;
    }

    createCheapestShipments(): AllocatedShipment[] {
        return [];
    }
}

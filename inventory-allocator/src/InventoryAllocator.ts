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
        let result: AllocatedShipment[] = [];
        if (Object.keys(this.ordersMap).length == 0) {
            return result;
        }
        this.warehousesArr.forEach(warehouse => {
            let shipment: AllocatedShipment = {};
            shipment[warehouse.name] = {};
            let canShipItems: boolean;
            let warehouseInventory: ItemMap = warehouse.inventory;
            let warehouseInventoryNames: string[] = Object.keys(warehouseInventory);
            warehouseInventoryNames.forEach(name => {
                let warehouseCount: number = warehouseInventory[name];
                let orderCount: number = this.ordersMap[name];
                let itemDiff: number = orderCount - warehouseCount;
                if (orderCount == 0) {
                    return;
                }
                if (itemDiff >= 0) {
                    shipment[warehouse.name][name] = warehouseCount;
                    this.ordersMap[name] = orderCount - warehouseCount;
                    warehouseInventory[name] = 0;
                } else {
                    shipment[warehouse.name][name] = orderCount;
                    this.ordersMap[name] = 0;
                    warehouseInventory[name] = warehouseCount - orderCount;
                }
                canShipItems = true;
            });
            if (canShipItems) {
                result.push(shipment);
            }
        });
        return result;
    }
}

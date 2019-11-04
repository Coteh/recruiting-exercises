/**
 * Deliverr Recruiting Challenge - Inventory Allocator
 * By: James Cote
 */

import { ItemMap, Warehouse, AllocatedShipment } from "./InventoryTypes";

/**
 * Takes an inventory of items and a list of warehouses,
 * and generates an allocated list of warehouses.
 */
export class InventoryAllocator {
    private ordersMap: ItemMap;
    private warehousesArr: Warehouse[];

    /**
     * Constructs an instance of {@link InventoryAllocator}
     * @param ordersMap an inventory of items ordered
     * @param warehousesArr a list of warehouses
     */
    constructor(ordersMap: ItemMap, warehousesArr: Warehouse[]) {
        this.ordersMap = ordersMap;
        this.warehousesArr = warehousesArr;
    }

    /**
     * Generates a list of allocated shipments given the
     * inventory and warehouses this class was instantiated with
     * @returns array of {@link AllocatedShipment} instances containing item quantities to be shipped
     */
    createCheapestShipments(): AllocatedShipment[] {
        let result: AllocatedShipment[] = [];
        if (!this.ordersMap || !this.warehousesArr || Object.keys(this.ordersMap).length == 0) {
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
                // If number of items ordered is 0 (or undefined)
                if (!orderCount) {
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

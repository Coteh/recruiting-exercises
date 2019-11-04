/**
 * Deliverr Recruiting Challenge - Inventory Allocator
 * By: James Cote
 */

/**
 * Represents an inventory of items, can be used to represent:
 * - inventory of items user ordered
 * - inventory of items stored in warehouse
 * - inventory of items in allocated shipment
 */
export type ItemMap = {
    [itemName: string]: number
}

/**
 * Represents a warehouse, with a name that identifies the warehouse,
 * and an inventory containing the quantities of items stored in warehouse
 */
export type Warehouse = {
    name: string,
    inventory: ItemMap
}

/**
 * Represents a shipment of items that are allocated given an inventory of items
 * the user ordered, and a collection of warehouses containing items
 * @see InventoryAllocator
 */
export type AllocatedShipment = {
    [warehouseName: string]: ItemMap
}

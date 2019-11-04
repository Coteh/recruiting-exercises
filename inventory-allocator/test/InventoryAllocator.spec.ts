/**
 * Deliverr Recruiting Challenge - Inventory Allocator
 * By: James Cote
 */

import { InventoryAllocator } from "../src/InventoryAllocator";
import { AllocatedShipment, ItemMap, Warehouse } from "../src/InventoryTypes";
import { expect } from "chai";
import "mocha";

describe("Test", () => {
    it("should return allocated shipments", () => {
        var itemMap: ItemMap = {apple: 5, banana: 5, orange: 5};
        var warehouses: Warehouse[] = [
            {
                name: "owd",
                inventory: {
                    apple: 5,
                    orange: 10
                }
            },
            {
                name: "dm",
                inventory: {
                    banana: 5,
                    orange: 10
                }
            }
        ];
        var inventoryAllocator: InventoryAllocator = new InventoryAllocator(itemMap, warehouses);
        var allocatedShipments: AllocatedShipment[] = inventoryAllocator.createCheapestShipments();
        expect(allocatedShipments.length).to.be.greaterThan(0);
    });
    it("should return an exact allocated shipment for an exact inventory match", () => {
        var itemMap: ItemMap = { apple: 1, banana: 5 };
        var warehouses: Warehouse[] = [
            {
                name: "owd",
                inventory: {
                    apple: 1,
                    banana: 5
                }
            }
        ];
        var inventoryAllocator: InventoryAllocator = new InventoryAllocator(itemMap, warehouses);
        var allocatedShipments: AllocatedShipment[] = inventoryAllocator.createCheapestShipments();
        expect(allocatedShipments.length).to.be.equal(1);
        expect(allocatedShipments[0]["owd"]).to.deep.equal({
            apple: 1,
            banana: 5
        });
    });
    it("should split an item order across warehouses if that is the only way to completely ship the order", () => {
        var itemMap: ItemMap = { apple: 10 };
        var warehouses: Warehouse[] = [
            {
                name: "owd",
                inventory: {
                    apple: 5
                }
            },
            {
                name: "dm",
                inventory: {
                    apple: 5
                }
            }
        ];
        var inventoryAllocator: InventoryAllocator = new InventoryAllocator(itemMap, warehouses);
        var allocatedShipments: AllocatedShipment[] = inventoryAllocator.createCheapestShipments();
        expect(allocatedShipments.length).to.be.equal(2);
        expect(allocatedShipments[0]["owd"]).to.deep.equal({
            apple: 5
        });
        expect(allocatedShipments[1]["dm"]).to.deep.equal({
            apple: 5
        });
    });
    it("should return no allocated shipments if not enough inventory", () => {
        var itemMap: ItemMap = { apple: 0 };
        var warehouses: Warehouse[] = [
            {
                name: "owd",
                inventory: {
                    apple: 1
                }
            }
        ];
        var inventoryAllocator: InventoryAllocator = new InventoryAllocator(itemMap, warehouses);
        var allocatedShipments: AllocatedShipment[] = inventoryAllocator.createCheapestShipments();
        expect(allocatedShipments.length).to.be.equal(0);
    });
    it("should return no allocated shipments if no warehouses contain the items ordered", () => {
        var itemMap: ItemMap = { apple: 1 };
        var warehouses: Warehouse[] = [
            {
                name: "owd",
                inventory: {
                    banana: 1
                }
            }
        ];
        var inventoryAllocator: InventoryAllocator = new InventoryAllocator(itemMap, warehouses);
        var allocatedShipments: AllocatedShipment[] = inventoryAllocator.createCheapestShipments();
        expect(allocatedShipments.length).to.be.equal(0);
    });
    it("should return no allocated shipments if no items were passed in", () => {
        var warehouses: Warehouse[] = [
            {
                name: "owd",
                inventory: {
                    apple: 5,
                    orange: 10
                }
            }
        ];
        var inventoryAllocator: InventoryAllocator = new InventoryAllocator({}, warehouses);
        var allocatedShipments: AllocatedShipment[] = inventoryAllocator.createCheapestShipments();
        expect(allocatedShipments.length).to.be.equal(0);
    });
    it("should return no allocated shipments if the items map passed in is undefined", () => {
        var warehouses: Warehouse[] = [
            {
                name: "owd",
                inventory: {
                    apple: 5,
                    orange: 10
                }
            }
        ];
        var inventoryAllocator: InventoryAllocator = new InventoryAllocator(undefined, warehouses);
        var allocatedShipments: AllocatedShipment[] = inventoryAllocator.createCheapestShipments();
        expect(allocatedShipments.length).to.be.equal(0);
    });
    it("should return no allocated shipments if no warehouses were passed in", () => {
        var itemMap: ItemMap = { apple: 5 };
        var inventoryAllocator: InventoryAllocator = new InventoryAllocator(itemMap, []);
        var allocatedShipments: AllocatedShipment[] = inventoryAllocator.createCheapestShipments();
        expect(allocatedShipments.length).to.be.equal(0);
    });
    it("should return no allocated shipments if warehouses array passed in is undefined", () => {
        var itemMap: ItemMap = { apple: 5 };
        var inventoryAllocator: InventoryAllocator = new InventoryAllocator(itemMap, undefined);
        var allocatedShipments: AllocatedShipment[] = inventoryAllocator.createCheapestShipments();
        expect(allocatedShipments.length).to.be.equal(0);
    });
});
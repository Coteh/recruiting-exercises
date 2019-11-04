import { InventoryAllocator, AllocatedShipment, ItemMap, Warehouse } from "../src/InventoryAllocator";
import { expect } from "chai";
import "mocha";

describe("Test", () => {
    it("should return an allocated shipment", () => {
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
        expect.fail("Not implemented yet");
    });
    it("should split an item order across warehouses if that is the only way to completely ship the order", () => {
        expect.fail("Not implemented yet");
    });
    it("should return no allocated shipments if not enough inventory", () => {
        expect.fail("Not implemented yet");
    });
    it("should return no allocated shipments if no items were passed in", () => {
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
        var inventoryAllocator: InventoryAllocator = new InventoryAllocator({}, warehouses);
        var allocatedShipments: AllocatedShipment[] = inventoryAllocator.createCheapestShipments();
        expect.fail("Not implemented yet");
    });
    it("should return no allocated shipments if no warehouse were passed in", () => {
        var itemMap: ItemMap = { apple: 5, banana: 5, orange: 5 };
        var inventoryAllocator: InventoryAllocator = new InventoryAllocator(itemMap, []);
        var allocatedShipments: AllocatedShipment[] = inventoryAllocator.createCheapestShipments();
        expect.fail("Not implemented yet");
    });
});
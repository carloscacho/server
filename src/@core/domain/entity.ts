/**
 * Base Entity class for DDD entities
 * All domain entities should extend this class
 */
export abstract class Entity<T = number> {
    constructor(public readonly id: T) { }

    equals(other: Entity<T>): boolean {
        if (other === null || other === undefined) {
            return false;
        }
        if (!(other instanceof Entity)) {
            return false;
        }
        return this.id === other.id;
    }
}

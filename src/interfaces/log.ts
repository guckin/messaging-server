export interface Log<T> {
    push(item: T): void;
    toArray(): T[];
}

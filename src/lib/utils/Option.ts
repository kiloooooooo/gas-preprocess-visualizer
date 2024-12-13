export class Some<T> {
    value: T;
    constructor(value: T) {
        this.value = value;
    }
}

export class None { }

export type Option<T> = Some<T> | None;

enum BorderT {
    NONE = 0,
    TOP = 1,
    BOTTOM = 1 << 1,
    LEFT = 1 << 2,
    RIGHT = 1 << 3
}

class Border {

    static NONE = BorderT.NONE
    static TOP = BorderT.TOP
    static BOTTOM = BorderT.BOTTOM
    static LEFT = BorderT.LEFT
    static RIGHT = BorderT.RIGHT
    static ALL = BorderT.TOP | BorderT.BOTTOM | BorderT.LEFT | BorderT.RIGHT

    private _value: BorderT

    constructor(value: BorderT) {
        this._value = value
    }

    get value() {
        return this._value
    }

    remove(toRemove: BorderT) {
        const flipped = ~toRemove
        // do and with current value
        this._value = this._value & flipped
    }

}

export { Border }
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

    value: BorderT

    constructor(value: BorderT) {
        this.value = value
    }

}

export { Border }
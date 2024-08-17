import { Border } from "./Border"
import { Role } from "./Role"

class Square {

    private _index: number
    private _row: number
    private _column: number
    private _border: Border
    private _role: Role

    constructor(index: number, row: number, column: number, border: Border, role: Role = Role.NONE) {
        this._index = index
        this._row = row
        this._column = column
        this._border = border
        this._role = role
    }
    
    get index() {
        return this._index
    }

    get row() {
        return this._row
    }

    get column() {
        return this._column
    }

    get border() {
        return this._border
    }

    get role() {
        return this._role
    }

    set role(newRole: Role) {
        if (this._role !== Role.NONE) {
            throw new Error("Square.setRole: Cannot change role once it is set")
        }
        this._role = newRole
    }

}

export { Square }
import { Border } from "./Border"
import { Role } from "./Role"

class Square {

    index: number
    row: number
    column: number
    border: Border
    role: Role

    constructor(index: number, row: number, column: number, border: Border, role: Role = Role.NONE) {
        this.index = index
        this.row = row
        this.column = column
        this.border = border
        this.role = role
    }

}

export { Square }
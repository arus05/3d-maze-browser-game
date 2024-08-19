import { Border } from "../model/Border";
import { Role } from "../model/Role";
import { Square } from "../model/Square";

const squares = [
    new Square(0, 0, 0, new Border(Border.TOP | Border.LEFT)),
    new Square(1, 0, 1, new Border(Border.TOP | Border.RIGHT)),
    new Square(2, 0, 2, new Border(Border.LEFT | Border.RIGHT), Role.EXIT),
    new Square(3, 0, 3, new Border(Border.TOP | Border.LEFT | Border.RIGHT)),
    new Square(4, 1, 0, new Border(Border.BOTTOM | Border.LEFT | Border.RIGHT)),
    new Square(5, 1, 1, new Border(Border.LEFT | Border.RIGHT)),
    new Square(6, 1, 2, new Border(Border.BOTTOM | Border.LEFT)),
    new Square(7, 1, 3, new Border(Border.RIGHT)),
    new Square(8, 2, 0, new Border(Border.TOP | Border.LEFT), Role.ENTRANCE),
    new Square(9, 2, 1, new Border(Border.BOTTOM)),
    new Square(10, 2, 2, new Border(Border.TOP | Border.BOTTOM)),
    new Square(11, 2, 3, new Border(Border.BOTTOM | Border.RIGHT))
]

export { squares }
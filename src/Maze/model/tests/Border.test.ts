import { test, expect } from "vitest"
import { Border } from "../Border"

test("Border", () => {
    const border = new Border(Border.LEFT | Border.RIGHT | Border.TOP)
    expect(border.value).toEqual(0xD) 
})

test("Border.remove", () => {
    const border = new Border(Border.LEFT | Border.RIGHT | Border.TOP)
    border.remove(Border.TOP)
    border.remove(Border.BOTTOM)
    expect(border.value).toEqual(Border.LEFT | Border.RIGHT)
})
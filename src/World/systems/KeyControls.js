class KeyControls {
    constructor() {
        this.pressed = {}
        
        window.addEventListener("keydown", (e) => {
            this.pressed[e.key] = true
        })

        window.addEventListener("keyup", (e) => {
            delete this.pressed[e.key]
        })
    }

    getPressed() {
        return this.pressed
    }
    
}

export { KeyControls }
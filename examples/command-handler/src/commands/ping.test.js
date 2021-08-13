const ping = require("./ping")
// @ponicode
describe("ping.execute", () => {
    test("0", () => {
        let callFunction = () => {
            ping.execute({ channel: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            ping.execute({ channel: "a85a8e6b-348b-4011-a1ec-1e78e9620782" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            ping.execute({ channel: "7289708e-b17a-477c-8a77-9ab575c4b4d8" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            ping.execute(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

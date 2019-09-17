import { TestHelper } from "@openzeppelin/cli"
import { Contract, Contracts, ZWeb3, ProxyAdminProject, AppProject } from "@openzeppelin/upgrades"
import BN from "bn.js"

ZWeb3.initialize(web3.currentProvider)

const Bushel = Contracts.getFromLocal("Bushel_V1")
Contracts.setArtifactsDefaults({
    gas: 6721975,
    gasPrice: 100000000000
})

contract("Bushel", accounts => {
    let project: ProxyAdminProject | AppProject
    let proxy: Contract
    const owner = accounts[0]
    const treasury = accounts[1]
    const supply = new BN('1000000000000000000000000')

    beforeEach(async () => {
        project = await TestHelper()
        proxy = await project.createProxy(Bushel, {
            initMethod: "initialize(address,address,uint256)",
            initArgs: [owner, treasury, supply.toString()]
        })
    })

    it("should assign the initial balance to the treasury", async () => {
        const resultBalance = await proxy.methods.balanceOf(treasury).call()
        expect(resultBalance.toString()).to.equal(supply.toString())
    })

    describe("reportRevenue", () => {

        it("should send 50% of revenue to the originator", async () => {
            const originator = accounts[2]
            const amount = "40000000000000000000000" // Corresponds to 40000 bushesl
            await proxy.methods.reportRevenue(originator, amount).send({
                from: owner,
                gas: 6721975,
                gasPrice: 100000000000
            })
            const originatorBalance = await proxy.methods.balanceOf(originator).call()
            expect(originatorBalance.toString()).to.equal("20000000000000000000000")
        })

        it("should assign 50% of revenue to all other token holders pro rata", async () => {
            const otherAccount1 = accounts[3]
            const otherAccount2 = accounts[4]
            await proxy.methods.transfer(otherAccount1, "20000000000000000000000").send({
                from: treasury,
                gas: 6721975,
                gasPrice: 100000000000
            })
            await proxy.methods.transfer(otherAccount2, "20000000000000000000000").send({
                from: treasury,
                gas: 6721975,
                gasPrice: 100000000000
            })
            const originator = accounts[2]
            const amount = "40000000000000000000000" // Corresponds to 40000 bushesl
            await proxy.methods.reportRevenue(originator, amount).send({
                from: owner,
                gas: 6721975,
                gasPrice: 100000000000
            })

            const other1Balance = await proxy.methods.balanceOf(otherAccount1).call()
            const other2Balance = await proxy.methods.balanceOf(otherAccount2).call()
            const originatorBalance = await proxy.methods.balanceOf(originator).call()
            const treasuryBalance = await proxy.methods.balanceOf(treasury).call()
            expect(other1Balance.toString()).to.equal("20400000000000000000000")
            expect(other2Balance.toString()).to.equal("20400000000000000000000")
            expect(originatorBalance.toString()).to.equal("20000000000000000000000")
            expect(treasuryBalance.toString()).to.equal("939200000000000000000000")
        })

    })

})

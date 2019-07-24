import {range} from "../../src/util";

const size = 5
describe("It plays a complete game", () => {
    it("Loads the page", () => {
        cy.visit("/")
        // refresh the state
        cy.reload()
        cy.get("[data-cy=sizeControl]").should("exist")
    })
    it("Sets up a game", () => {
        cy.get("[data-cy=sizeControl]").select("5x5").should('have.value', size.toString())
        cy.get("[data-cy=createPuzzleBtn]").click().then(() => {
            cy.get("[data-cy=sizeControl]").should('not.exist')
        })
        cy.screenshot()
    })
    it("Should see a game", () => {
        cy.get("[data-cy=startBtn]").should("exist")
    })
    it("Should Start a game", () => {
        cy.get("[data-cy=startBtn]").click()
        cy.get("[data-cy=startBtn]").should("not.exist")
        cy.get("[data-cy=stopBtn]").should("exist")
    })
    it("Should play a game", () => {
        cy.get("[data-cy=numpad]").should("not.exist")
        range(size).forEach(x => {
            range(size).forEach(y => {
                cy.log(`Checking cell ${x},${y}`)
                cy.get(`[data-cy=rowHead${x}`).then(row => {
                    const rowText = row.text()
                    cy.get(`[data-cy=colHead${y}`).then( col => {
                        const colText = col.text()
                        cy.get(`[data-cy=cell${x}${y}`).click().then(() => {
                            cy.get(`[data-cy=currentProblem]`).should("exist").then(problem => {
                                expect(problem.text()).to.equal(`${rowText} + ${colText} = `)
                            }).then(problem => {
                                const sumValue = parseInt(rowText) + parseInt(colText)
                                const sum = [...sumValue.toString()]
                                let currentProblemText = problem.text()
                                sum.forEach(digit => {
                                    currentProblemText += digit
                                    cy.get(`[data-cy=numBtn${digit}]`).click(btn => {
                                        expect(btn).to.have.css('background-color', "rgb(110, 185, 247)")
                                        btn.should("have.css", "background-color").and("equal", "rgb(255,255,255)").then(() => {
                                            expect(problem.text()).to.equal(currentProblemText)
                                        })
                                    })
                                })
                            }).then(() => {
                                cy.get("[data-cy=numBtnOk]").click()
                            }).should("not.exist")
                        })
                    })
                })
            })
        })
        cy.get("[data-cy=checkAnswerBtn]").click()
    })
    it("Should get a perfect score", () => {
        cy.get("[data-cy=stopBtn]").should("not.exist").then(() => {
            cy.get("[data-cy=score]").should("exist").then(elem => {
                expect(elem.text()).to.equal((size*size).toString())
            })
        })
    })
    it("Should reset the state", () => {
        cy.get("[data-cy=resetBtn]").click().then(() => {
            cy.get("[data-cy=sizeControl]").should("exist")
        })
    })
})

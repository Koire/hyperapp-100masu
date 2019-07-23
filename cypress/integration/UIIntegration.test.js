import {range} from "../../src/util";

describe("UI Integration test", () => {
    it("Sets up a puzzle", () => {
        cy.visit("/")
        const size = 5
        cy.get("[data-cy=sizeControl]").select("1").find(":selected").should('have.text', "1x1")
        cy.get("[data-cy=sizeControl]").select("5x5").should('have.value', size.toString())
        cy.get("[data-cy=createPuzzleBtn]").click().then(obj => {
            cy.get("[data-cy=sizeControl]").should('not.exist')
        })
        range(size).forEach(x => {
            range(size).forEach(y => {
                cy.get(`[data-cy=cell${x}${y}`).click().then(dataCell => {
                    let sumValue = 0
                    cy.get("[data-cy=numpad]").should('exist')
                    cy.get(`[data-cy=rowHead${x}`).then(row => {
                        cy.get(`[data-cy=colHead${y}`).then( col => {
                            cy.get(`[data-cy=currentProblem]`).then(problem => {
                                sumValue = parseInt(row.text()) + parseInt(col.text())
                                const sum = [...sumValue.toString()]
                                let currentProblemText = problem.text()
                                expect(problem.text()).to.equal(`${row.text()} + ${col.text()} = `)
                                sum.forEach(char => {
                                    currentProblemText += char
                                    cy.get(`[data-cy=numBtn${char}]`).click(btn => {
                                        expect(btn).to.have.css('background-color', "#6eb9f7")
                                        expect(problem.text()).to.equal(currentProblemText)
                                    })
                                })
                                cy.get("[data-cy=numBtnOk]").click(() => {
                                    expect(parseInt(dataCell.text())).to.equal(sumValue)
                                })
                            })
                        })
                    })
                })
            })
        })
        cy.get("[data-cy=checkAnswerBtn]").click()
    })
})

import {range} from "../../src/util";

describe("UI Integration test", () => {
    it("Sets up a puzzle", () => {
        cy.visit("/")
        const size = 10
        cy.get("[data-cy=sizeControl]").select("10x10").should('have.value', "10")
        cy.get("[data-cy=createPuzzleBtn]").click().then(obj => {
            cy.get("[data-cy=sizeControl]").should('not.exist')
        })
        range(size).forEach(x => {
            range(size).forEach(y => {
                cy.get(`[data-cy=cell${x}${y}`).click().then(_ => {
                    cy.get("[data-cy=numpad]").should('exist')
                    cy.get("[data-cy=numBtnOk]").click()
                })
            })
        })
    })
})

export class CommonMethods {
    visitPage(url) {
        cy.visit(url);
    };

    clickOnElement(selector) {
        cy.get(selector).should("be.visible").click({force: true});
    };

    assertElementContainsExpectedText(webElement, text) {
        cy.get(webElement).should('be.visible').contains(text);
    };
}

export const commonMethods = new CommonMethods();
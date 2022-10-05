import {commonMethods} from "../common/CommonMethods";

export class Homepage {
    clickOnRestart() {
        commonMethods.clickOnElement('.gameWrapper .footnote a:first-of-type')
    };

    makeFirstMove() {
        commonMethods.clickOnElement('[name="space22"]')
        commonMethods.clickOnElement('[name="space33"]')
    };

    makeSecondMove() {
        commonMethods.assertElementContainsExpectedText('#message', 'Make a move.')
        commonMethods.clickOnElement(':nth-child(6)>:nth-child(8)')
        commonMethods.clickOnElement('[name="space13"]')
    };

    agreePrivacySettings() {
        cy.intercept("GET", "**/audit-tcfv2.cmp.quantcast.com/**").as("auditQuantcast");
        cy.wait("@auditQuantcast", {timeout: 50000});
        commonMethods.clickOnElement('[mode="primary"]')
    };

    checkNumberOfOrangePieces(expectedNoOfPieces) {
        cy.get('body').find('#board [src="you1.gif"]', {timeout:30000}).then((selector) => {
            let numberOfPieces = new Array()
            numberOfPieces = selector
            expect(numberOfPieces.length).to.eq(expectedNoOfPieces);
        })
    };

    assertPieceIsTaken() {
        this.checkNumberOfOrangePieces(11);
    };

    letComputerMove() {
        cy.intercept("GET", "**/pagead/**").as("pageAd");
        cy.wait("@pageAd", {timeout: 50000});
    };
}

export const homepage = new Homepage();

export class HttpRequests {
    createDeck() {
        cy.request({
            method: 'POST',
            url: `http://deckofcardsapi.com/api/deck/new/`,
        }).then((response) => {
            expect(response.body.deck_id).to.not.be.empty;
            expect(response.status).to.deep.equal(200);
            expect(response.body).to.include({
                success: true,
                remaining: 52,
                shuffled: false
            });
            cy.log('Newly created deck id is: ' + response.body.deck_id);
            cy.wrap(response.body.deck_id).as('deckId');
        })
    }

    shuffleDeck() {
        cy.get('@deckId').then((deckId) => {
            cy.request({
                method: 'POST',
                url: `http://deckofcardsapi.com/api/deck/${deckId}/shuffle/?deck_count=1`,
            }).then((response) => {
                expect(response.status).to.deep.equal(200);
            })
        });
    }

    drawCardFromDeck(countNumber) {
        cy.get('@deckId').then((deckId) => {
            cy.request({
                method: 'POST',
                url: `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${countNumber}`,
            }).then((response) => {
                expect(response.status).to.deep.equal(200);
            })
        });
    }

    addToPile(pileName, cards) {
        cy.get('@deckId').then((deckId) => {
            cy.request({
                method: 'POST',
                url: `http://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/add/?cards=${cards}`,
            }).then((response) => {
                expect(response.status).to.deep.equal(200);
                expect(response.body).to.have.property('remaining');
                cy.log(response.body.piles);
            }).then(() => {
                cy.request({
                    method: 'GET',
                    url: `http://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/list/`
                }).then((response) => {
                    expect(response.status).to.deep.equal(200);
                    expect(response.body.success).to.be.true;
                    expect(response.body.deck_id).to.deep.equal(deckId);
                    expect(response.body).to.have.property('remaining');
                });
            });
        });
    };

    shuffleThePile(pileName) {
        cy.get('@deckId').then((deckId) => {
            cy.request({
                method: 'POST',
                url: `http://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/shuffle/`,
            }).then((response) => {
                expect(response.status).to.deep.equal(200);
            });
        });
    }

    drawCardsFromPile(pileName, countNumber) {
        cy.get('@deckId').then((deckId) => {
            cy.request({
                method: 'POST',
                url: `http://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/draw/?count=${countNumber}`,
            }).then((response) => {
                expect(response.status).to.deep.equal(200);
            })
        })
    }
}

export const httpsRequests = new HttpRequests()
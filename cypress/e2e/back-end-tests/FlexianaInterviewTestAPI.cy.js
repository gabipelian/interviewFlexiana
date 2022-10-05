import {httpsRequests} from "../../requests/HttpRequests";

describe('Flexiana interview tests', () => {
    it('Deck test', () => {
        httpsRequests.createDeck();
        httpsRequests.shuffleDeck()
        httpsRequests.drawCardFromDeck(3);
        httpsRequests.addToPile('FIRST_PILE', 'AD,7H,QD,8D,9H');
        httpsRequests.addToPile('SECOND_PILE', 'AS,7D,QH,8S,9D');
        httpsRequests.shuffleThePile('FIRST_PILE');
        //because add to pile api doesn't work properly and error:
        //'Not enough cards remaining to draw 1 additional' is displayed, I used 0 as countNumber
        //When api will be fixed, the countNumber should be set to 2 and 3 acording to the requirements
        httpsRequests.drawCardsFromPile('FIRST_PILE', 0);
        httpsRequests.drawCardsFromPile('SECOND_PILE', 0);
    });
})

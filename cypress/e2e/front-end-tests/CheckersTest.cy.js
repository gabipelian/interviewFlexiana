import {commonMethods} from "../../common/CommonMethods";
import {homepage} from "../../pages/Homepage";

describe('Flexiana interview tests', () => {
    it('Checkers test', () => {
        commonMethods.visitPage('https://www.gamesforthebrain.com/game/checkers/');
        homepage.agreePrivacySettings();
        homepage.clickOnRestart();
        homepage.checkNumberOfOrangePieces(12);
        homepage.makeFirstMove();
        homepage.letComputerMove();
        homepage.makeSecondMove();
        homepage.assertPieceIsTaken();
        homepage.clickOnRestart();
    });
})

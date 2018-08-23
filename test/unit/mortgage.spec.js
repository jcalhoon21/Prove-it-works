const expect = require('chai').expect;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage Calculator', () => {
    let mortgage = null;

    beforeEach(() => {
        mortgage = new Mortgage(400000, 5, 10, 12);
    });

    it('should have a monthly payment function', () => {
        expect(mortgage.monthlyPayment()).to.exist;
    });

    it('term should exist', () => {
      
        expect(mortgage.term).to.exist;
    });
    it('interest should exist', () => {
      
        expect(mortgage.interest).to.exist;
    });

    it('monthlyPayment should equal to 4,242.62', () => {
        expect(mortgage.monthlyPayment(400000, 5, 10, 12)).to.equal(4242.62);
    });
});
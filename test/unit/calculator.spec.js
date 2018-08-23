const expect = require('chai').expect;
const Calculator = require('../../src/js/lib/Calculator');

describe('Calculator', () => {
  let calculator = null;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('should have an subtract function', () => {
    expect(calculator.subtract).to.exist;
  });

  it('should subtract 2 + 2 together correctly', () => {
    expect(calculator.subtract(2, 2)).to.equal(4);
  });
});
const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

describe('End to End Tests', () => {
    
    let httpServer = null;
    let pageObject = null;

  before((done) => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach(() => {
    pageObject = nightmare.goto(url);
  });

  after((done) => {
    httpServer.close();
    done();
  });

  // This is where your code is going to go

it('should contain a <h1> element for the page title', () => { 
    return pageObject
        .evaluate(() => document.querySelector('h1').innerText)
        .then(headerText => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal('Mortgage Calculator');
        });
});


it('should contain an <input> element for the principal', () => {
    return pageObject
        .evaluate(() => document.querySelector('input[name=principal]').innerText)
        .then(input => {
            expect(input).to.not.be.null;
            expect(input).to.exist;
        });
});


it('should contain an <input> element for the interestRate', () => {
    return pageObject
    .evaluate(() => document.querySelector('input[name=interestRate]').innerText)
    .then(input => {
        expect(input).to.not.be.null;
        expect(input).to.exist;
    });
});


it('should contain a <select> element for the loanTerm', () => {
    return pageObject
    .evaluate(() => document.querySelector('input[name=loanTerm]').innerText)
    .then(select => {
        expect(select).to.not.be.null;
        expect(select).to.exist;
    });
});


// it('should contain an <select> element with the option "12"', () => {
//     return pageObject
//     .evaluate(() => document.querySelector('select').innerText)
//     .then(select => {
//         expect(select).to.not.be.null;
//         expect(select).to.equal(12);
//     });
// });

it('should contain a <select> element for the period', () => {
    return pageObject
      .evaluate(() => document.querySelector('select[name=period]'))
        .then(select => {
          expect(select).to.not.be.null;
          expect(select).to.exist;
        });
});



it('should contain a <button> element for the button', () => {
return pageObject
  .evaluate(() => document.querySelector('button[name=calculate]'))
    .then(button => {
      expect(button).to.not.be.null;
      expect(button).to.exist;
    });
});


it('should contain a <p> element with an id of output', () => {
  return pageObject
  .evaluate(() => document.querySelector('p[name=output]'))
    .then(p => {
      expect(p).to.not.be.null;
      expect(p).to.exist;
    });
});



it('should correctly calculate mortgage', () =>
  pageObject
  .wait()
  .type('input[name=principal]', 300000)
  .type('input[name=interestRate]', 3.75)
  .type('input[name=loanTerm]', 30)
  .select('select[name=period]', 12)
  .click('button#calculate')
  .wait('#output')
  .evaluate(() => document.querySelector('#output').innerText)
  .then((outputText) => {
    expect(outputText).to.equal('$1389.35');
  })
).timeout(6500);


});


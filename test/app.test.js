const expect = require('chai').expect;
const salaryApp = require('../app.js');

describe('app.js test', () => {
    describe('getDayByName Test', () => {
        it('should equal Friday', () => {
            const result = salaryApp.getDayName('12/11/2020');
            expect(result).to.equal("Friday");
        });
    });
    describe('getBonusDate Test', () => {
        it('should equal 15/12/2020', () => {
            const result = salaryApp.getBonusDate(2020,11);
            expect(result).to.equal("15/12/2020");
        });
    });
    describe('getPaymentDate Test', () => {
        it('should equal 31/12/2020', () => {
            const result = salaryApp.getPaymentDate(2020,12);
            expect(result).to.equal("31/12/2020");
        });
    });
});
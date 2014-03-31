/**
 * End to end testing with protractor.
 */
describe('Home Test', function() {

    beforeEach(function() {
    });

    it('should go to home page by default', function() {
        browser.get('http://tok.client');
        expect(browser.getCurrentUrl()).toMatch(/\/home/);
    });
});
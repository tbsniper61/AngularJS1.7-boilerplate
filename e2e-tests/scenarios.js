'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('fourSquare', function() {
  it('should automatically redirect to /place when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch('/place');
  });

  describe('detail', function() {
    beforeEach(function() {
      browser.get('index.html#!/detail');
    });

    it('should render detail when user navigates to /detail', function() {
      expect(
        element
          .all(by.css('[ng-view] p'))
          .first()
          .getText()
      ).toMatch(/partial for detail 1/);
    });
  });
});

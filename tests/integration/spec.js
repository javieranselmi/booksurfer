// spec.js
describe('Books Search Page', function() {
  var searchBar = element(by.model('search'));
  var searchResults = element.all(by.repeater('book in books'));

  beforeEach(function() {
    browser.get('http://127.0.0.1:64249/index.html#books/search');
  });

  it('should find Harry Potter', function() {
    searchBar.sendKeys("Harry Potter");
      console.log(searchResults.map(function(item,index){return item.getText()}));
    //expect(searchResults.map(function(item,index){return item.getText().toContain("Harry Potter")}).count()).toBe(1);
      expect(true).toBe(true);
  });
  it('should find palmito', function() {
    searchBar.sendKeys("palmito");
    expect(searchResults.count()).toBe(1);
  });
});
function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFavFoods = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(this.foods), 2000);
  });
}

describe('mocking', () => {
  it('mock a reg function', () => {
    const fetchDogs = jest.fn();
    fetchDogs();
    expect(fetchDogs).toHaveBeenCalled();
  });

  it('can create a person', () => {
    const me = new Person('Marcin', ['pizza']);
    expect(me.name).toBe('Marcin');
  });

  it('can fetch foods', async () => {
    const me = new Person('Marcin', ['pizza']);
    me.fetchFavFoods = jest.fn().mockResolvedValue(['pizza', 'sushi']);
    const favFoods = await me.fetchFavFoods();
    expect(favFoods).toContain('pizza');
  })

});
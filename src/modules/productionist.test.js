import Productionist from './productionist'

test('Productionist.test', () => {
  const testProd = new Productionist();
  expect(testProd.test_funct()).toBe(true);
});

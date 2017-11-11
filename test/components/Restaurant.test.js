// import { shallow } from 'vue-test-utils'
// import Restaurant from '../../src/components/Restaurant'
//
// describe('Restaurant Component', () => {
//   let cmp
//
//   beforeEach(() => {
//     cmp = shallow(Restaurant, {
//       propsData: {
//         getRestaurantByPosition: () => {
//           return {}
//         }
//       }
//     })
//   })
//
//   it('has received a function as a prop', () => {
//     expect(typeof cmp.vm.getRestaurantByPosition).toBe('function')
//   })
// })




// Fake test

const sum = (x,y) => x+y

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
})

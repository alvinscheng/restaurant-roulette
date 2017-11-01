import { shallow } from 'vue-test-utils'
import Restaurant from '../../src/components/Restaurant'

describe('Restaurant Component', () => {
  let cmp

  beforeEach(() => {
    cmp = shallow(Restaurant, {
      propsData: {
        getRestaurantByPosition: () => {
          return {}
        }
      }
    })
  })

  it('has received a function as a prop', () => {
    expect(typeof cmp.vm.getRestaurantByPosition).toBe('function')
  })
})

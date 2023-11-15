import {objectDiff, presence} from '@/utils'

describe('Utility tests', () => {

  test.only('presence', () => {
    expect(presence("Hello")).toBe("Hello")
    expect(presence(0)).toBe(0)
    expect(presence(false)).toBe(null)
    expect(presence([])).toBe(null)
    expect(presence({})).toBe(null)
    expect(presence("")).toBe(null)
  })

  test('objectDiff', () => {
    expect(objectDiff({a: '1', b: '2'}, {a: '3', b: '2'})).toEqual({a: '3'})
    expect(objectDiff({a: '1', b: '2'}, {b: '2'})).toEqual({a: undefined})
    expect(objectDiff({a: '1'}, {a: '1', b: '2'})).toEqual({b: '2'})
    expect(objectDiff({a: '1'}, {a: null})).toEqual({a: null})
  })

})

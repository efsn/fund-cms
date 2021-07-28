// @ts-ignore
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers'

expect.extend({
  toBeInTheDocument(element) {
    if (typeof element === 'function') {
      try {
        element = element()
      } catch (e) {
        return {
          pass: false,
          message: () => `element${!this.isNot ? ' could not be ' : ' '}found in the document`,
        }
      }
    }
    return toBeInTheDocument(element)
  },
})

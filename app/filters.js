const { DateTime } = require('luxon')
const humanizeDuration = require('humanize-duration')

module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  const filters = {}

  /**
   * Convert object to array
   * @type {String} str
   *
  */
  filters.date = (str, format = 'yyyy-LL-dd') => {
    if (str) {
      const date = (str === 'now') ? DateTime.local() : str

      const datetime = DateTime.fromISO(date, {
        locale: 'en-GB'
      }).toFormat(format)

      return datetime
    }
  }

  /**
   * Convert milliseconds to readable duration
   * @type {String} str
   *
  */
  filters.duration = (int) => {
    if (!isNaN(int)) {
      const duration = humanizeDuration(int, {
        delimiter: ' and ',
        largest: 2,
        round: true,
        units: ['y', 'mo']
      })

      return duration
    }
  }

  /**
   * Convert object to array
   * @type {Object} obj
   *
  */
  filters.toArray = (obj) => {
    if (obj) {
      const arr = []
      for (const [key, value] of Object.entries(obj)) {
        value.id = key
        arr.push(value)
      }
      return arr
    }
  }

  return filters
}

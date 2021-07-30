/**
 * for remove page
 */

 module.exports = (choices) => {
    return [
      {
        type: 'rawlist',
        message: 'Please select page',
        name: 'pageName',
        choices,
      }
    ]
  }
  
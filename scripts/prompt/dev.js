/**
 * for dev build
 */

 module.exports = (choices) => {
    return [
      {
        type: 'rawlist',
        message: 'Please select appId to start, (`00000 checked will build all pages`)',
        name: 'appId',
        choices,
      }
    ]
  }
  
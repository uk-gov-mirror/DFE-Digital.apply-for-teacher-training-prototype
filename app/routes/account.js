const utils = require('../utils')

/**
 * Account routes
 */
module.exports = router => {
  router.post('/account', (req, res) => {
    const hasAccount = req.session.data['has-account']

    if (hasAccount === 'yes') {
      utils.sendEmail(req, 'c3457068-675e-4ff9-963e-2e7444607bad')
      res.redirect('/account/check-email/sign-in')
    } else {
      res.redirect('/check-you-can-use-this-service')
    }
  })

  // Check email prompt
  router.get('/account/check-email/:action', (req, res) => {
    res.render('account/check-email', {
      action: req.params.action
    })
  })

  // Update choice status and phase from sign-in link in decision notification
  router.get('/account/sign-in', (req, res) => {
    const { phase, status, token } = req.query

    if (phase) {
      // Update application phase
      req.session.data.phase = phase
    }

    if (status) {
      // Get most recent application
      const applications = utils.toArray(req.session.data.applications)
      const application = applications[applications.length - 1]

      // Get statuses
      const statuses = status.split(';')

      // Get choices still pending a decision
      const choices = utils.toArray(application.choices)
      application.choices = choices.map((choice, i) => {
        choice.status = statuses[i]
        return choice
      })
    }

    if (token) {
      // Set data.token value when signing out
      req.session.data.token = true
    }

    res.render('account/sign-in')
  })

  // Remove data.token value when signing out
  router.get('/account/sign-out', (req, res, next) => {
    delete req.session.data.token
    res.redirect('/')
  })
}

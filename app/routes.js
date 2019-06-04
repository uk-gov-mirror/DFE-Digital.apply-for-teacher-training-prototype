const express = require('express')
const router = express.Router()

router.post('/application/personal-details/answer', function (req, res) {
  let nationality = req.session.data['nationality']

  let eea = ['country:AT', 'country:BE', 'country:BG', 'country:HR', 'country:CY', 'country:CZ', 'country:DK', 'country:EE', 'country:FI', 'country:FR', 'country:DE', 'country:GR', 'country:HU', 'country:IS', 'country:IE', 'country:IT', 'country:LV', 'country:LT', 'country:LI', 'country:LU', 'country:MT', 'country:NL', 'country:NO', 'country:PL', 'country:PT', 'country:RO', 'country:SK', 'country:SI', 'country:ES', 'country:SE', 'country:CH', 'country:GB']

  if (eea.includes(nationality)) {
    res.redirect('/application')
  } else {
    res.redirect('/application/personal-details/residency-status')
  }
})

module.exports = router

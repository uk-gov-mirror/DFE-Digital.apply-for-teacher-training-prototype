const express = require('express')
const router = express.Router()

// Utils
const generateRandomString = () => {
  return (Number(new Date())).toString(36).slice(-5)
}

// Application: Personal details
router.post('/profile/personal-details/answer', (req, res) => {
  let nationality = req.session.data['candidate']['nationality']

  let eea = ['Austrian', 'Belgian', 'Bulgarian', 'Croatian', 'Cypriot', 'Czech', 'Danish', 'Dutch', 'Estonian', 'Finnish', 'French', 'German', 'Greek', 'Hungarian', 'Icelandic', 'Irish', 'Italian', 'Latvian', 'Liechtenstein citizen', 'Lithuanian', 'Luxembourger', 'Maltese', 'Norwegian', 'Polish', 'Portuguese', 'Romanian', 'Slovak', 'Slovenian', 'Spanish', 'Swedish', 'Swiss', 'British']

  if (eea.includes(nationality)) {
    res.redirect('/profile/personal-details/review')
  } else {
    res.redirect('/profile/personal-details/residency-status')
  }
})

// Application: Contact details
router.post('/profile/contact-details/address-answer', (req, res) => {
  let location = req.session.data['contact-details']['address-type']

  if (location === 'domestic') {
    res.redirect('/profile/contact-details/lookup-address')
  } else {
    res.redirect('/profile/contact-details/review')
  }
})

router.get('/profile/contact-details/address/:action', (req, res) => {
  res.render('profile/contact-details/address', {
    action: req.params.action
  })
})

// Application: Degree provenance
router.post('/profile/academic-qualifications/degree-answer', (req, res) => {
  let degree = req.session.data['degree']

  if (degree === 'domestic') {
    res.redirect('/profile/academic-qualifications/degree/add')
  } else {
    res.redirect('/profile/academic-qualifications/international-degree/add')
  }
})

// Application: UK degree
router.get('/profile/academic-qualifications/degree/add', (req, res) => {
  let id = generateRandomString()

  res.redirect(`/profile/academic-qualifications/degree/add/${id}`)
})

router.get('/profile/academic-qualifications/degree/:action/:id', (req, res) => {
  res.render('profile/academic-qualifications/degree-details', {
    action: req.params.action,
    id: req.params.id
  })
})

// Application: International degree
router.get('/profile/academic-qualifications/international-degree/add', (req, res) => {
  let id = generateRandomString()

  res.redirect(`/profile/academic-qualifications/international-degree/add/${id}`)
})

router.get('/profile/academic-qualifications/international-degree/:action/:id', (req, res) => {
  res.render('profile/academic-qualifications/degree-details', {
    international: true,
    action: req.params.action,
    id: req.params.id
  })
})

// Application: Maths GCSE
router.get('/profile/academic-qualifications/maths-gcse', (req, res) => {
  res.render('profile/academic-qualifications/gcse', {
    action: 'add',
    formAction: '/profile/academic-qualifications/maths-gcse-answer',
    title: 'Add maths GCSE or equivalent',
    subject: 'maths',
    buttonText: 'Save and continue'
  })
})

router.post('/profile/academic-qualifications/maths-gcse-answer', (req, res) => {
  let gcse = req.session.data['maths-qualification']

  if (gcse === 'domestic') {
    res.redirect('/profile/academic-qualifications/add-maths-gcse')
  } else if (gcse === 'international') {
    res.redirect('/profile/academic-qualifications/add-maths-equivalent')
  } else { // If qualification missing, go to next step
    res.redirect('/profile/academic-qualifications/english-gcse')
  }
})

router.get('/profile/academic-qualifications/add-maths-gcse', (req, res) => {
  res.render('profile/academic-qualifications/subject-gcse', {
    action: 'add',
    formAction: '/profile/academic-qualifications/english-gcse',
    title: 'Add maths GCSE',
    subject: 'maths',
    buttonText: 'Save and continue'
  })
})

router.get('/profile/academic-qualifications/add-maths-equivalent', (req, res) => {
  res.render('profile/academic-qualifications/subject-equivalent', {
    action: 'add',
    formAction: '/profile/academic-qualifications/english-gcse',
    title: 'Add maths GCSE equivalent qualification',
    subject: 'maths',
    buttonText: 'Save and continue'
  })
})

router.get('/profile/academic-qualifications/edit-maths-gcse', (req, res) => {
  res.render('profile/academic-qualifications/subject-gcse', {
    action: 'edit',
    formAction: '/profile/academic-qualifications/review',
    title: 'Edit maths GCSE',
    subject: 'maths',
    buttonText: 'Save changes'
  })
})

router.get('/profile/academic-qualifications/edit-maths-equivalent', (req, res) => {
  res.render('profile/academic-qualifications/subject-equivalent', {
    action: 'edit',
    formAction: '/profile/academic-qualifications/review',
    title: 'Edit maths GCSE equivalent qualification',
    subject: 'maths',
    buttonText: 'Save changes'
  })
})

// Application: English GCSE
router.get('/profile/academic-qualifications/english-gcse', (req, res) => {
  res.render('profile/academic-qualifications/gcse', {
    action: 'add',
    formAction: '/profile/academic-qualifications/english-gcse-answer',
    title: 'Add English GCSE or equivalent',
    subject: 'english',
    buttonText: 'Save and continue'
  })
})

router.post('/profile/academic-qualifications/english-gcse-answer', (req, res) => {
  let gcse = req.session.data['english-qualification']

  if (gcse === 'domestic') {
    res.redirect('/profile/academic-qualifications/add-english-gcse')
  } else if (gcse === 'international') {
    res.redirect('/profile/academic-qualifications/add-english-equivalent')
  } else { // If qualification missing, go to next step
    res.redirect('/profile/academic-qualifications/science-gcse')
  }
})

router.get('/profile/academic-qualifications/add-english-gcse', (req, res) => {
  res.render('profile/academic-qualifications/subject-gcse', {
    action: 'add',
    formAction: '/profile/academic-qualifications/science-gcse',
    title: 'Add English GCSE',
    subject: 'english',
    buttonText: 'Save and continue'
  })
})

router.get('/profile/academic-qualifications/add-english-equivalent', (req, res) => {
  res.render('profile/academic-qualifications/subject-equivalent', {
    action: 'add',
    formAction: '/profile/academic-qualifications/science-gcse',
    title: 'Add English GCSE equivalent qualification',
    subject: 'english',
    buttonText: 'Save and continue'
  })
})

router.get('/profile/academic-qualifications/edit-english-gcse', (req, res) => {
  res.render('profile/academic-qualifications/subject-gcse', {
    action: 'edit',
    formAction: '/profile/academic-qualifications/review',
    title: 'Edit English GCSE',
    subject: 'english',
    buttonText: 'Save changes'
  })
})

router.get('/profile/academic-qualifications/edit-english-equivalent', (req, res) => {
  res.render('profile/academic-qualifications/subject-equivalent', {
    action: 'edit',
    formAction: '/profile/academic-qualifications/review',
    title: 'Edit English GCSE equivalent qualification',
    subject: 'english',
    buttonText: 'Save changes'
  })
})

// Application: Science GCSE
router.get('/profile/academic-qualifications/science-gcse', (req, res) => {
  res.render('profile/academic-qualifications/gcse', {
    action: 'add',
    formAction: '/profile/academic-qualifications/science-gcse-answer',
    title: 'Add science GCSE or equivalent',
    subject: 'science',
    buttonText: 'Save and continue'
  })
})

router.post('/profile/academic-qualifications/science-gcse-answer', (req, res) => {
  let gcse = req.session.data['science-qualification']

  if (gcse === 'domestic') {
    res.redirect('/profile/academic-qualifications/add-science-gcse')
  } else if (gcse === 'international') {
    res.redirect('/profile/academic-qualifications/add-science-equivalent')
  } else { // If qualification missing, go to next step
    res.redirect('/profile/academic-qualifications/review')
  }
})

router.get('/profile/academic-qualifications/add-science-gcse', (req, res) => {
  res.render('profile/academic-qualifications/subject-gcse', {
    action: 'add',
    formAction: '/profile/academic-qualifications/review',
    title: 'Add science GCSE',
    subject: 'science',
    buttonText: 'Save and continue'
  })
})

router.get('/profile/academic-qualifications/add-science-equivalent', (req, res) => {
  res.render('profile/academic-qualifications/subject-equivalent', {
    action: 'add',
    formAction: '/profile/academic-qualifications/review',
    title: 'Add science GCSE equivalent qualification',
    subject: 'science',
    buttonText: 'Save and continue'
  })
})

router.get('/profile/academic-qualifications/edit-science-gcse', (req, res) => {
  res.render('profile/academic-qualifications/subject-gcse', {
    action: 'edit',
    formAction: '/profile/academic-qualifications/review',
    title: 'Edit science GCSE',
    subject: 'science',
    buttonText: 'Save changes'
  })
})

router.get('/profile/academic-qualifications/edit-science-equivalent', (req, res) => {
  res.render('profile/academic-qualifications/subject-equivalent', {
    action: 'edit',
    formAction: '/profile/academic-qualifications/review',
    title: 'Edit science GCSE equivalent qualification',
    subject: 'science',
    buttonText: 'Save changes'
  })
})

// Application: Other qualifications
router.get('/profile/academic-qualifications/qualification/add', (req, res) => {
  let id = generateRandomString()

  res.redirect(`/profile/academic-qualifications/qualification/add/${id}`)
})

router.get('/profile/academic-qualifications/qualification/:action/:id', (req, res) => {
  res.render('profile/academic-qualifications/qualification', {
    action: req.params.action,
    id: req.params.id
  })
})

// Application: Work history
router.get('/profile/work-history/job/add', (req, res) => {
  let id = generateRandomString()

  res.redirect(`/profile/work-history/job/add/${id}`)
})

router.get('/profile/work-history/job/:action/:id', (req, res) => {
  res.render('profile/work-history/job', {
    action: req.params.action,
    id: req.params.id
  })
})

// Application: School experience
router.get('/profile/school-experience/role/add', (req, res) => {
  let id = generateRandomString()

  res.redirect(`/profile/school-experience/role/add/${id}`)
})

router.get('/profile/school-experience/role/:action/:id', (req, res) => {
  res.render('profile/school-experience/role', {
    action: req.params.action,
    id: req.params.id
  })
})

// Application: References
router.get('/profile/references/add-referee/:id', (req, res) => {
  const id = req.params.id

  res.render('profile/references/referee', {
    action: 'add',
    buttonText: 'Save and continue',
    formAction: (id === 'principle') ? '/profile/references/add-referee/secondary' : '/profile/references/review',
    id,
    title: `Add ${id} referee`
  })
})

router.get('/profile/references/edit-referee/:id', (req, res) => {
  const id = req.params.id

  res.render('profile/references/referee', {
    action: 'edit',
    buttonText: 'Save changes',
    formAction: '/profile/references/review',
    id,
    title: `Edit ${id} referee`
  })
})

module.exports = router

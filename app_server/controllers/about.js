module.exports.about = function(req, res, next) {
    res.render('about', { title: 'Techifier Kart' , team:[{
      imgSrc:'/images/profileCards/farooqCard.jpg',
      name: 'Farooq Shah',
      position : 'CEO & Founder, Techifier',
      university: 'Fast University',
      fbLink:'https://www.facebook.com/farouqBukhari',
      twLink:'https://twitter.com/FarooqS00283898',
      gitLink:'https://github.com/FarooqBukhari',
      lkLink:'https://www.linkedin.com/in/farooq-shah-bukhari/'
    },
    {
      imgSrc:'/images/profileCards/fawad.jpg',
      name: 'Fawad Omer',
      position : 'COO, Techifier',
      university: 'Fast University',
      fbLink:'https://www.facebook.com/FawadOmerSid',
      twLink:'https://twitter.com/fawadomersid',
      gitLink:'https://github.com/FawadOmerSid',
      lkLink:'/'
    },
    {
      imgSrc:'/images/profileCards/zaidi.jpg',
      name: 'Sajjad Zaidi',
      position : 'CTO, Techifier',
      university: 'Fast University',
      fbLink:'https://www.facebook.com/syedsajjadzaidi',
      twLink:'/',
      gitLink:'https://github.com/smsajjadzaidi1',
      lkLink:'/'
    },
    {
      imgSrc:'/images/profileCards/rouel.jpg',
      name: 'Rouel Shafi',
      position : 'CFO, Techifier',
      university: 'Fast University',
      fbLink:'https://www.facebook.com/chaudhary.rouel',
      twLink:'/',
      gitLink:'https://github.com/MrRouel',
      lkLink:'/'
    },
  ] });
  };


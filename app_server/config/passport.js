var passport = require('passport');
var User = require('../models/user');
var localStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user,done){
    done(null , user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user);
    });
});

passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var gender = req.body.gender;
    var designation = req.body.designation;
    req.checkBody('email' , 'Invalid email').notEmpty().isEmail();
    req.checkBody('password' , 'Invalid Password').notEmpty().isLength({min:4});
    req.checkBody('gender','Enter Gender').notEmpty();
    req.checkBody('fname','Enter First Name').notEmpty();
    req.checkBody('lname','Enter Last Name').notEmpty();
    req.checkBody('fname','Invalid Designation').notEmpty().isLength({min:3});
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null , false , req.flash('error' , messages));
    }

    User.findOne({'email': email}, function(err, user){
        if(err){
            return done(err);
        }
        if(user){
            return done(null, false, {message: 'Email is already in use.'});
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.gender = gender;
        newUser.fname = fname;
        newUser.lname = lname;
        newUser.designation = designation;
        if(gender == 'Male'){
          newUser.profilePicture = '/images/users/maleDefault.png';
        }
        else{
          newUser.profilePicture = '/images/users/femaleDefault.png';
        }
        newUser.adminPriviliges = false;
        newUser.save(function(err, result){
            if (err){
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin' , new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},  function(req, email, password, done){
    req.checkBody('email' , 'Invalid email').notEmpty().isEmail();
    req.checkBody('password' , 'Invalid Password').notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null , false , req.flash('error' , messages));
    }
    User.findOne({'email': email}, function(err, user){
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {message: 'No User found.'});
        }
        if(!user.validPassword(password)){
            return done(null, false, {message: 'Wrong Password.'});
        }
        return done(null , user);
    });

}));
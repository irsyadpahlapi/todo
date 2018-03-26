const User = require('../models/User')
const Item = require('../models/Item')
const FB   = require('fb')
const jwt  = require('jsonwebtoken')

module.exports = {
    signIn : (req,res) => {
        FB.setAccessToken(req.body.data);
        FB.api('me', {fields: ['id' , 'name', 'email', 'gender', 'picture'], access_token: req.body.data}, function(userData) {
                User.findOne({
                email : userData.email
            })
            .exec()
            .then((user) => {
                if (user) {
                    let token = jwt.sign({userId : user._id, idFb : user.fb_id, email : user.email}, process.env.SECRET)
                    res.status(200).json({
                        message : `Login success`,
                        data : {
                          token   : token,
                          tokenfb   : req.body.data,
                        },
                    })
                } else {
                    User.create({
                        id_fb : userData.id,
                        email : userData.email,
                        picture : userData.picture.data.url,
                        gender : userData.gender,
                        status : 'user'
                    }, (err,newUser) => {
                        if (err) {
                            res.status(500).json({
                                message : `Failed to create new account`,
                                data    : {}
                            })
                        }

                        let token = jwt.sign({userId : newUser._id, fbId : newUser.id_fb, email : newUser.emai},process.env.SECRET)

                        res.status(200).json({
                            message : `New account created, login success !`,
                            data    : {
                              token   : token,
                              tokenfb   : req.body.data,
                            }
                        })
                    })
                }
            })
        })
    },

    testJwt : (req,res) => {
      let token=req.headers.token
      let decoded  = jwt.verify(token, process.env.SECRET)
      FB.setAccessToken(req.headers.tokenfb);
      FB.api('me', {fields: ['id' , 'name', 'email', 'gender', 'picture'], access_token: req.headers.tokenfb}, function(userData) {
        Item.find({itemsuserid: decoded.userId}).then((item) => {
        res.status(200).json({
              message : `Selamat, token anda berhasil !`,
              name: userData.name,
              items:item
          })
        })
      })
    },
    additems:(req,res)=>{
      let angka = Math.floor(Math.random() * Math.floor(3))+1
      let token=req.headers.token
      let descripsi=req.headers.descripsi
      let title= req.headers.title
      let picture = `assets/img/thumbnail${angka}.png`
      let decoded  = jwt.verify(token, process.env.SECRET)
      let Items= new Item()
       Items.picture=picture
       Items.title=title
       Items.descripsi=descripsi
       Items.itemsuserid=decoded.userId
       Items.done = false
       Items.save().then(data=>{
         res.status(200).send(data)
       }).catch(error=>{
         res.status(500).send(error)
       })
    },
    updatetodo:(req,res)=>{
      Item.updateOne(
        {_id: req.params.id},
        {$set:
          {
            done:req.body.done,
          }
        })
      .then(data=>{
        res.status(200).send(data)
      }).catch(error=>{
        res.status(500).send(error)
      })
    },
    deleteitem:(req,res)=>{
     Item.deleteOne({_id: req.params.id})
     .then(data=>{
       console.log('succes delete');
       res.status(200).send(data)
     }).catch(error=>{
       res.status(500).send(error)
     })
   },
   showitem:(req,res)=>{
     let token=req.headers.token
     let decoded  = jwt.verify(token, process.env.SECRET)
     Item.find({itemsuserid: decoded.userId}).populate('itemsuserid').exec().then((item) => {
       res.status(200).send(item)
     })
  }
}

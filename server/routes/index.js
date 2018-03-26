var express             = require('express');
var router              = express.Router();
var facebookController  = require('../controllers/FacebookController')
var auth                = require('../middlewares/auth')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signinfb', facebookController.signIn)
router.get('/testjwt', auth.check, facebookController.testJwt)
router.get('/showitem',facebookController.showitem)
router.post('/additems',facebookController.additems)
router.delete('/:id',facebookController.deleteitem)
router.put('/:id',facebookController.updatetodo)

module.exports = router;

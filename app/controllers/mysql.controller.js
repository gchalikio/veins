const models = require("../config/connection").mysqlModels;

module.exports.create = (req, res, next) => {

    models.Product.build({ name: req.body.name, price: req.body.price})
        .save().then( () => {
            res.send("success")
        }).catch(err => {
            res.send("error")
    })
    
}

module.exports.read = (req, res, next) => {
    
    models.Product.findAll().then(product => {        
        res.send("success")
    }).catch(err => {
        console.log(err);
        res.send("error")
    })

}

module.exports.readOne = (req, res, next) => {
    
    var id = req.params.id;
    models.Product.findOne({ where: {name: id} }).then(product => {        
        res.send("success")
      }).catch(err => {
        console.log(err);
        res.send("error")
    })
}

module.exports.update = (req, res, next) => {

    var id = req.params.id;
    models.Product.update({price: 40}, {where: {name: id}}).then( () => {
        res.send("success")
    }).catch(err => {
        console.log(err);
        res.send("error")
    });
}

module.exports.delete = (req, res, next) => {
  
    var id = req.params.id;
    models.Product.destroy({ where: {name: id} }).then( () => {
        res.send("success")
    }).catch(err => {
        console.log(err);
        res.send("error")
    });

}


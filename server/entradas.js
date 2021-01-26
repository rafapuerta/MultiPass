const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const objectID = mongodb.ObjectID;

router.get("/conciertos", function (req, res) {
  let db = req.app.locals.db;

  db.collection("conciertos")
    .find()
    .toArray(function (error, datos) {
      if (error !== null) {
        res.send({ mensaje: "Ha habido un error. " + error });
      } else {
        res.send(datos);
      }
    });
});

router.post("/comprar", function (req, res) {
  let db = req.app.locals.db;

  db.collection("conciertos")
    .find({ _id: objectID(req.body.id) })
    .toArray(function (error, datos) {
      if (error !== null) {
        res.send({ mensaje: "Ha habido un error. " + error });
      } else {
        let fecha = datos[0].fecha;
        let numero = datos[0].entradas;
        let grupo = datos[0].artista;
        let sala = datos[0].sala;
        let id = datos[0]._id;
        let cartel = datos[0].cartel;
        let categoria = datos[0].categoria;
        let peso = datos[0].peso;

        db.collection("conciertos").updateOne(
          { _id: objectID(req.body.id) },
          { $inc: { entradas: -1 } },
          function (error, datos) {
            if (error !== null) {
              res.send({ mensaje: "Ha habido un error. " + error });
            } else {
              db.collection("usuarios").updateOne(
                { email: req.body.email },
                {
                  $push: {
                    entradas: {
                      id: id,
                      numero: numero,
                      fecha: fecha,
                      grupo: grupo,
                      sala: sala,
                      cartel: cartel,
                      categoria: categoria,
                      peso: peso,
                    },
                  },
                },
                function (error, datos) {
                  if (error !== null) {
                    res.send({ mensaje: "Ha habido un error. " + error });
                  } else {
                    res.send({ mensaje: "Compra realizada correctamente" });
                  }
                }
              );
            }
          }
        );
      }
    });
});

router.post("/eliminar", function (req, res) {
  let db = req.app.locals.db;

  db.collection("usuarios").findOneAndUpdate(
    { email: req.body.email },
    { $pull: { entradas: {id: objectID(req.body.id)} } },
    function (error, datos) {
      if (error !== null) {
        res.send({ mensaje: "Ha habido un error. " + error });
      } else {
        db.collection("conciertos").updateOne(
          { _id: objectID(req.body.id) },
          { $inc: { entradas: 1 } },
          function (error, datos) {
            if (error !== null) {
              res.send({ mensaje: "Ha habido un error. " + error });
            } else {
              res.send({ datos, mensaje: "Eliminada Correctamente" });
            }
          }
        );
      }
    }
  );
});

router.post("/anyadir", function (req, res){
  let db = req.app.locals.db;

  db.collection("conciertos").insertOne(
    {
      artista: req.body.artista,
      cartel: req.body.cartel,
      fecha: req.body.fecha,
      entradas: parseInt(req.body.entradas),
      soldout: false,
      sala: req.body.sala,
      categoria: parseInt(req.body.categoria),
      peso: parseInt(req.body.peso), 
    },
    function (error, datos) {
      if (error !== null) {
        res.send({ mensaje: "Ha habido un error. " + error });
      } else {
        res.send({
          error: false,
          mensaje: "Entrada añadida correctamente.",
        });
      }
    }
  );
})

module.exports = router;

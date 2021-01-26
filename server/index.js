const express = require("express")
const MongoClient = require("mongodb").MongoClient
const app = express ()
const cors = require("cors");
const passport = require("passport");
const bcrypt = require("bcrypt");
const config = require("./config.json")

let entradas = require("./entradas")
let noticias = require("./noticias")


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors());

app.use("/entradas", entradas)
app.use("/noticias", noticias)


MongoClient.connect(config.mongoPath,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function( error, client){
    if (error !== null) {
        console.log(error);
      } else {
        app.locals.db = client.db("festival");
      }
})


//----------------PASSPORT------------------- //
const session = require("express-session");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      app.locals.db.collection("usuarios")
        .find({ email: email })
        .toArray(function (err, users) {
          if (users.length === 0) {
            return done(null, false);

          }
          const user = users[0];
          if (bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.email);
});

passport.deserializeUser(function (id, done) {
  app.locals.db.collection("usuarios")
    .find({ email: id })
    .toArray(function (err, users) {
      if (users.length === 0) {
        done(null, null);
      }
      done(null, users[0]);
    });
});

//------------------------------------------------------//


//------------------- User routes ---------------------//

app.post(
  "/user/login",
  passport.authenticate("local", {
    successRedirect: "/user/info",
    failureRedirect: "/user/fail",
  })
);

app.get('/user/logout', function (req, res){
  req.session.destroy(function (err) {
    res.send({ mensaje: "Logout correcto" });
  });
});

app.get("/user/info", function (req, res) {
  if (req.isAuthenticated()) {
    return res.send(req.user);
  }
  res.send({ error: true, mensaje: "No logueado" });
});

app.get("/user/fail", function (req, res) {
  res.status(401).send({ error: true, mensaje: "Denegado" });
});


app.post("/user/registrar", function (req, res) {
  let email = req.body.email;
  app.locals.db.collection("usuarios")
    .find({ email: email })
    .toArray(function (error, datos) {
      if (error !== null) {
        res.send({ mensaje: "Ha habido un error. " + error });
      } else {
        if (datos.length != 0) {
          res.send({ unico: false, mensaje: "Email ya registrado." });
        } else {
          app.locals.db.collection("usuarios").insertOne(
            {
              nombre: req.body.nombre,
              apellido1: req.body.apellido1,
              apellido2: req.body.apellido2,
              dni: req.body.dni,
              telf: req.body.telf,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 10),
              categoria: parseInt(req.body.categoria),
              entradas: [],
              img: req.body.img,
            },
            function (error, datos) {
              if (error !== null) {
                res.send({ mensaje: "Ha habido un error. " + error });
              } else {
                res.send({
                  unico: true,
                  mensaje: "Cliente registrado correctamente.",
                });
              }
            }
          );
        }
      }
    });
});


app.put("/user/edit", function (req, res) {

  let email = req.body.email;
  let nombre = req.body.nombre;
  let apellido1 = req.body.apellido1;
  let apellido2 = req.body.apellido2;
  let dni = req.body.dni;
  let telf = req.body.telf;
  let categoria = parseInt(req.body.categoria);
  let img = req.body.img

  app.locals.db.collection("usuarios").updateOne(
    { email: email },
    {
      $set: {
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        dni: dni,
        telf: telf,
        categoria: categoria,
        img: img, 
      },
    },
    function (error, datos) {
      if (error !== null) {
        res.send({ error: true, mensaje: "Ha habido un error. " + error });
      } else {
        res.send({ error: false, mensaje: "Usuario editado correctamente" });
      }
    }
  );
});


app.delete("/user/delete", function(req, res){
  if (req.isAuthenticated() === false) {
    return res.status(401).send({ mensaje: "No logueado" });
  }

  req.app.locals.db.collection("usuarios").deleteOne({email: req.body.email}, function (error, datos) {
    if (error !== null) {
      res.send({ mensaje: "Ha habido un error. " + error });
    } else {
      res.send({ mensaje: "Eliminado correctamente" });
    }
  })
})

/* app.get("/user", function (req, res) {
  if (req.isAuthenticated() === false) {
    return res.status(401).send({ error: true, mensaje: "No logueado" });
  }
  res.send({ error: false, mensaje: "Login correcto" });
}); */

/* app.post("/user/register", function (req, res) {
  app.locals.db.collection("usuarios").insertOne(
    {
      nombre: req.body.nombre,
      apellido1: req.body.apellido1,
      apellido2: req.body.apellido2,
      dni: req.body.dni,
      telf: req.body.telf,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    },
    function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send({ mensaje: "Registrado" });
      }
    }
  );
}); */

app.listen(3001)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3001;
const Cpu = require('./models/Cpu');
const Gpu = require('./models/Gpu');
const Laptop=require('./models/Laptop');
const Telephone=require('./models/Telephone');
app.use(express.json());
app.use(cors());

const dbURI = process.env.DB_URI || "mongodb+srv://KING2MO:104766Dia-@king2mocomparetechclust.go2fdac.mongodb.net/?appName=KING2MOCOMPARETECHCLUSTER";
mongoose.connect(dbURI)
  .then((result) => {
    console.log('Connecté avec succès à MongoDB:');
    app.listen(port, () => {
      console.log(`serveur démarré sur http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB:', err);
  });

app.get('/', (req, res) => {
  res.send('Felications, votre serveur backend fonctionne est connecté à la DB !');
});

app.post('/api/cpus', (req, res) => {
  if (Array.isArray(req.body)) {
    Cpu.insertMany(req.body)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(400).json({ error: err.message });
      });
  } else {
    const newCpu = new Cpu(req.body);
    newCpu.save()
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(400).json({ error: err.message });
      });
  }
});

app.get('/api/cpus', (req, res) => {
  Cpu.find({})
    .then(cpus => {
      res.status(200).json(cpus);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.get('/api/cpus/:id', (req, res) => {
  const id = req.params.id;
  Cpu.findById(id)
    .then(cpu => { 
      if (cpu) { 
        res.status(200).json(cpu);
      } else {
        res.status(404).json({ error: "CPU non trouvé" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.post('/api/cpus/compare', (req, res) => {
  const ids = req.body.ids;
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ error: "Un tableau d'IDs est requis" });
  }
  Cpu.find({
    '_id': { $in: ids }
  })
  .then(cpus => {
    res.status(200).json(cpus);
  })
  .catch(err => {
    res.status(500).json({ error: err.message });
  });
});

app.post('/api/gpus', (req, res)=>{
  if(Array.isArray(req.body)){
    Gpu.insertMany(req.body)
      .then(result=>res.status(201).json(result))
      .catch(err=>res.status(400).json({error:err.message}));
    } else{
      const newGpu=new Gpu(req.body);
      newGpu.save()
      .then(result=>res.status(201).json(result))
      .catch(err=>res.status(400).json({error:err.message}));
    }
  });
  
app.get('/api/gpus', (req, res) => {
  Gpu.find({})
    .then(gpus => res.status(200).json(gpus))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/api/gpus/:id', (req, res) => {
  const id = req.params.id;
  Gpu.findById(id)
    .then(gpu => gpu ? res.status(200).json(gpu) : res.status(404).json({ error: "GPU non trouvé" }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/api/gpus/compare', (req, res) => {
  const ids = req.body.ids;
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ error: "Un tableau d'IDs est requis" });
  }
  Gpu.find({ '_id': { $in: ids } })
    .then(gpus => res.status(200).json(gpus))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/api/laptops', (req, res)=>{
  if(Array.isArray(req.body)){
    Laptop.insertMany(req.body)
      .then(result=>res.status(201).json(result))
      .catch(err=>res.status(400).json({error:err.message}));
    } else{
      const newLaptop = new Laptop(req.body);
      newLaptop.save()
      .then(result=>res.status(201).json(result))
      .catch(err=>res.status(400).json({error:err.message}));
    }
  });
  
app.get('/api/laptops', (req, res) => {
  Laptop.find({})
    .then(laptops => res.status(200).json(laptops))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/api/laptops/:id', (req, res) => {
  const id = req.params.id;
  Laptop.findById(id)
    .then(laptop => laptop ? res.status(200).json(laptop) : res.status(404).json({ error: "Laptop non trouvé" }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/api/laptops/compare', (req, res) => {
  const ids = req.body.ids;
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ error: "Un tableau d'IDs est requis" });
  }
  Laptop.find({ '_id': { $in: ids } })
    .then(laptops => res.status(200).json(laptops))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/api/telephones',(req,res)=>{
  if(Array.isArray(req.body)){
    Telephone.insertMany(req.body)
      .then(result=>res.status(201).json(result))
      .catch(err=>res.status(400).json({error:err.message}));
    } else{
      const newTelephone=new Telephone(req.body);
      newTelephone.save()
      .then(result=>res.status(201).json(result))
      .catch(err=>res.status(400).json({error:err.message}));
    }
  });

 
app.get('/api/telephones',(req, res) => {
  Telephone.find({})
    .then(telephones => res.status(200).json(telephones))
    .catch(err => res.status(500).json({ error: err.message }));

});
  
  app.get('/api/telephones/:id', (req,res)=>{
    const id=req.params.id;
    Telephone.findById(id)
      .then(telephone=>telephone? res.status(200).json(telephone):res.status(404).json({error:"Telephone non trouve"}))
      .catch(err=>res.status(500).json({error:err.message}));
  });

  app.post('/api/telephones/compare',(req,res)=>{
    const ids=req.body.ids;
    if(!ids||!Array.isArray(ids)){
      return res.status(400).json({error:"Un tableau d'IDs est rquis"});
    }
    Telephone.find({['_id']:{$in:ids}})
    .then(telephones=>res.status(200).json(telephones))
    .catch(err=>res.status(500).json({error:err.message}));
  });
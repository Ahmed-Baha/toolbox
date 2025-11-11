require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Campground = require('./models/campgrounds')
const cors = require('cors')
const axios = require("axios")
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? ['https://toolbox2-seven.vercel.app']
    : ['http://localhost:5173', 'http://localhost:3000']





// Configure CORS with environment variable
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
    return callback(null, true);
  },
  credentials: true
}))
app.use(express.json())

// Connect to MongoDB
main().then(() => console.log('db connected')).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

app.get('/api',async (req,res)=>{
  try {
    // return all campgrounds
    const camps = await Campground.find({});
    res.json(camps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
})


app.post('/api',async (req,res)=>{
    const { name, description, location,price }=req.body
    console.log('recieved data',req.body);
    const newCamp=await new Campground({ name, description, location,price })
   await newCamp.save()
    res.json({message:'customer recieved', data:newCamp})
    
})
app.post('/api/headloss', (req, res) => {
  const { L, Q, D, C } = req.body;

  if (!L || !Q || !D || !C) {
    return res.status(400).json({ error: 'Missing parameters' });
  }




  // Convert units: L (m), D (mm → m), Q (L/s → m³/s)
  const Dm = D / 1000;
  const Qm = Q / 1000;

  const hf = 10.67 * (L * Math.pow(Qm, 1.852)) / (Math.pow(C, 1.852) * Math.pow(Dm, 4.87));
    const v = (4 * Qm) / (Math.PI * Math.pow(Dm, 2));


  res.json({
    head_loss: hf.toFixed(3),
    message: `Head loss = ${hf.toFixed(3)} m`,
    details: { v: v.toFixed(3), C, L, D, Q }
  });
});

app.post('/api/darcy', (req, res) => {
  const { L, Q, D, f } = req.body;

  // Convert units (assuming Q in L/s and D in mm)
  const Q_m3s = Q / 1000;     // L/s → m³/s
  const D_m = D / 1000;       // mm → m
  const g = 9.81;

  const v = (4 * Q_m3s) / (Math.PI * Math.pow(D_m, 2));
  const hf = f * (L / D_m) * (v * v) / (2 * g);

  res.json({
    message: `Darcy–Weisbach head loss = ${hf.toFixed(3)} m`,
    details: { v: v.toFixed(3), f, L, D, Q }
  });
});
app.post("/api/elevation", async (req, res) => {
  try {
    const { coordinates } = req.body;

    if (!coordinates || coordinates.length === 0) {
      return res.status(400).json({ error: "No coordinates provided" });
    }

    // Convert coordinates into Open-Elevation format
    const locations = coordinates.map((c) => ({
      latitude: c.lat,
      longitude: c.lng,
    }));

    // Call the free public Open-Elevation API
    const elevationResponse = await axios.post(
      "https://api.open-elevation.com/api/v1/lookup",
      { locations }
    );

    res.json(elevationResponse.data.results);
  } catch (err) {
    console.error("Elevation API error:", err.message);
    res.status(500).json({ error: "Failed to fetch elevation data" });
  }
});
module.exports = app;
// Do not call app.listen here! Vercel will handle the serverless function export.
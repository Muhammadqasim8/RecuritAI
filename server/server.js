const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const jobSeekerRoutes = require('./routes/jobSeekerRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app=express();

app.use(cors());
app.use(express.json());

app.use('/api/auth' , authRoutes);
app.use('/api/jobseeker', jobSeekerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api', profileRoutes);
app.use('/profile-pics', express.static(path.join(__dirname, 'middleware/profile-pics')));



app.listen(process.env.PORT,()=>{
    console.log(`RecruitAI is running on PORT ${process.env.PORT}`);
    
})



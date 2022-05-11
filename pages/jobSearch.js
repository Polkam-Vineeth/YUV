import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Job from '../components/Job'
import Header from '../components/Header'


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// export default function Home() {
export default function jobSearch() {

  const [jobList, setJobList] = useState([])
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const [search, setSearch] = useState(''); // '' is the initial state value
  const [location, setLocation] = useState('');

  const getjobs = (s) => {
    s.preventDefault()

    if (!search && !location) {
      alert("Please Enter Job Title and Location!🤗")
    } else {
      axios.get(`https://api.adzuna.com/v1/api/jobs/in/search/2?app_id=556a76b5&app_key=3aec47ef511650b9a6116ecc2e53b333&results_per_page=10&what=${search}&where=${location}`)
        .then(res => { setJobList(res.data.results), console.log(res.data.results) })
        .catch(err => console.log(err))
    }
  }

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Job🔍</title>
        <link rel="icon" href="/YUV-logo-highlighted.png" />
      </Head>

      <Header/>
      {/* <header className="flex justify-center items-center py-4 ">

        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="sm:flex space-x-2 pr-4">
          <Link href="/" passHref><Image src="/YUV-logo-white.png" className="mx-auto" width="60" height="60" alt="No Img"></Image></Link>
            <h2 className="text-3xl md:text-4xl mt-2">YUV</h2>
          </div>
        </div>

      </header> */}

      
      <main className="items-center max-w-screen-lg mx-auto p-2">
      <div
      className="bg-white dark:bg-[#1D2226] rounded-lg space-y-2 py-2.5 border border-gray-300 dark:border-none"
    >
        <div className="space-y-4 xl:space-y-6 p-2">
          
          <h1 className="text-3xl md:text-5xl pt-2 text-center text-amber-800/80 xl:pl-0">
            Looking for a Job?
          </h1>
          <h2 className='uppercase text-center p-1'>"Today is an Opportunity to get better. Don't waste it and search for it."</h2>
        </div>
        <br></br>
        <form className="w-full max-w-lg mx-auto items-center p-2">
          <div className="flex flex-wrap -mx-3 mb-6 ">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Job Title:
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" value={search} onInput={e => setSearch(e.target.value)} required type="text" placeholder="Enter the Job Title" />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Location:
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"  value={location} onInput={e => setLocation(e.target.value)} type="text" placeholder="Enter the Location" />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2"
                onClick={getjobs}>Search Jobs</button>
            </div>
          </div>
          <br></br>
        </form>
        {
          jobList.length >= 1 ? jobList.map((job, idx) => {
            return <div key={idx}  className="p-2 bg-[#F3F2EF] dark:bg-black dark:text-white" >
              <Card sx={{ minWidth: 275 }} >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Job Title : {job.title}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Company : {job.company.display_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(job.created).toLocaleDateString('en-GB', options)} - {new Date(job.created).toLocaleTimeString()}
                  </Typography>
                  <Typography paragraph gutterBottom>Location : {job.location.display_name}</Typography>
                </CardContent>

                <CardActions disableSpacing>
                  <p className='text-center'>Show more:</p>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Description:</Typography>
                    <Typography paragraph>{job.description}</Typography>
                    <Button size="small"><a href={job.redirect_url} target="_blank">Apply Now</a></Button>
                  </CardContent>
                </Collapse>
              </Card>
              <br></br>
            </div>
          })
            : <div className="justify-center items-center text-center py-4"><h1 className='text-center pb-2'>"Please Enter valid keywords for better search results!🎯"</h1>
              <Image src="https://cdni.iconscout.com/illustration/premium/thumb/online-job-consultancy-4488735-3757130.png" className=" sm:w-[220px] sm:h-[220px]" width="440px" height="440px" alt="No Img"></Image>
            </div>
        }

        {/* { 
        jobList.length >= 1 ? jobList.map(job => {
          return <Job key={job.id} job={job} />
        })
        : "Please Enter valid keywords for better search results!"
      } */}
</div>
      </main>
      
    </div>
    
  )
}
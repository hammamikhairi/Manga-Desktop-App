
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const LinearProgressStyle = styled(LinearProgress)(({ theme }) => ({
  height: 3,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#424242",
  },
}));

const BorderLinearProgress = ({className, max, level}) => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let i = 0
    const progressInterval = setInterval(() => {
      setProgress((i/max)*100)
      i++
      if (i > level) 
        clearInterval(progressInterval)
    }, 10)
  }, [])

  return (
    <>
      <LinearProgressStyle 
        value = {progress}
        variant = "determinate"
       className = {className}
      /> 
    </>
  )
}

export default BorderLinearProgress;
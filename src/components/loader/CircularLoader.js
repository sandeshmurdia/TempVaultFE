import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CircularLoader = () => {
    return (
        <div>
            {console.log('Loading')}
            <Box sx={{marginLeft:'10px'}}>
                <CircularProgress style={{color:'#2548ff'}} size={22}/>
            </Box>
        </div>
    )
}

export default CircularLoader; 
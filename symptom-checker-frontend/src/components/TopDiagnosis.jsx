// react
import PropTypes from 'prop-types'
// material UI
import { Launch } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'


export default function TopDiagnosis({ label, score, detail, url }){
    return(
        <Typography gutterBottom variant="h5" component="div">
            <Typography variant="h6" dangerouslySetInnerHTML={{ __html: label }} />
            <Typography variant="body2" color="primary">{score}%</Typography>
            <Typography variant="body2">{detail}</Typography>
            <Button 
                variant="outlined" 
                endIcon={<Launch />}
                href={url}
                target="_blank" rel="noopener noreferrer"
            >
                Read More
            </Button> 
        </Typography>
    )
}

TopDiagnosis.propTypes = {
    label: PropTypes.string,
    score: PropTypes.number,
    detail: PropTypes.string,
    url: PropTypes.string
}
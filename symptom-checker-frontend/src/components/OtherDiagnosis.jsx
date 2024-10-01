// react
import PropTypes from 'prop-types'
import { useState } from 'react' 
// material UI
import { Box, Button, Chip } from '@mui/material'
import { ExpandMoreOutlined } from '@mui/icons-material'

export default function OtherDiagnosis({ resultSet, type }){
    // setup results limitation 
    const [displayLimit, setDisplayLimit] = useState(5)
    const showMore = () => {
        setDisplayLimit(prevLimit => prevLimit + 5)
    }
    const displayedResults = resultSet.label.slice(0, displayLimit)

    return(
        <Box display="flex" flexDirection="column" gap={1}>
            {displayedResults.map((label, index) => (
            <Chip 
                key={index}
                variant="outlined"
                color={type === 'included' ? "secondary" : "info"}
                label={
                    <span 
                        dangerouslySetInnerHTML={{ __html: `${label} : ${resultSet.score[index]}%` }} 
                    />
                }
                component="a"
                href={resultSet.url[index]}
                target="_blank" 
                rel="noopener noreferrer"
                clickable
            />
            ))}
            {displayLimit < resultSet.label.length && (
                <Button
                    onClick={showMore}
                    variant="filled"
                    size="small"
                    color="info"
                    endIcon={<ExpandMoreOutlined />}
                />
            )}
        </Box>
    )
}

OtherDiagnosis.propTypes = {
    resultSet: PropTypes.shape({
        label: PropTypes.array,
        score: PropTypes.array,
        url: PropTypes.array,
    }),
    type: PropTypes.string,
}
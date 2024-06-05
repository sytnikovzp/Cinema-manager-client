import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// =============================================
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
// =============================================
import { buttonMainStyle } from '../../services/styleService';
import { emptyStudio } from '../../constants';

function StudiosItem() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const studios = useSelector((state) => state.studiosList.studios);

  const { id } = useParams();

  const studio = studios.find((studio) => studio.id === Number(id));

  const currentStudio = studio ? studio : emptyStudio;

  const formattedMovies = currentStudio.movies.join(', ');

  return (
    <>
      <Stack direction='row' justifyContent='left'>
        <Button
          id='goBack-btn'
          type='button'
          variant='contained'
          color='info'
          style={buttonMainStyle}
          sx={{ marginTop: -8, textAlign: 'left' }}
          startIcon={<KeyboardBackspaceIcon />}
          onClick={goBack}
        >
          Go back
        </Button>
      </Stack>

      <Box
        sx={{
          minHeight: '57vh',
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '100%' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '40%',
            }}
          >
            <Card>
              <CardMedia
                component='img'
                height='100%'
                image={currentStudio.logo}
                alt={currentStudio.title}
              />
            </Card>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '60%',
            }}
          >
            <Typography variant='h6' component='div'>
              Title: {currentStudio.title}
            </Typography>
            <Typography variant='body1' component='div'>
              Foundation Year: {currentStudio.foundationYear}
            </Typography>
            <Typography variant='body1' component='div'>
              Location: {currentStudio.location}
            </Typography>
            <Typography variant='body1' component='div' sx={{ marginTop: 2 }}>
              Movies: {formattedMovies}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default StudiosItem;

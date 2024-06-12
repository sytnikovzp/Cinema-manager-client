import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
// =============================================
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// =============================================
import { buttonMainStyle } from '../../services/styleService';
import { emptyStudio } from '../../constants';
import { getAllStudios, resetStatus } from '../../store/slices/studiosSlice';
// =============================================
import useSnackbar from '../../hooks';

function StudiosItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate('/studios');
  };

  const studios = useSelector((state) => state.studiosList.studios);
  const status = useSelector((state) => state.studiosList.status);

  const { snackbar, showSnackbar, handleClose } = useSnackbar(() =>
    dispatch(resetStatus())
  );

  const prevStatusRef = useRef();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllStudios());
  }, [dispatch]);

  useEffect(() => {
    const prevStatus = prevStatusRef.current;
    const currentStatus = status;

    if (currentStatus && currentStatus !== prevStatus) {
      const severity = currentStatus.toLowerCase().includes('success')
        ? 'success'
        : 'error';
      showSnackbar(currentStatus, severity);
    }

    prevStatusRef.current = currentStatus;
  }, [status, showSnackbar]);

  const studio = studios.find((studio) => Number(studio.id) === Number(id));

  const currentStudio = studio ? studio : emptyStudio;

  const formattedMovies = currentStudio.movies
    ? currentStudio.movies.join(', ')
    : 'No movies available';

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Button
          id='goBack-btn'
          type='button'
          variant='contained'
          color='info'
          sx={buttonMainStyle}
          startIcon={<KeyboardBackspaceIcon />}
          onClick={goBack}
        >
          Go back
        </Button>

        <Button
          id='goBack-btn'
          type='button'
          variant='contained'
          color='success'
          sx={buttonMainStyle}
          startIcon={<EditIcon />}
          component={Link}
          to={`/studios/new/${id}`}
        >
          Edit
        </Button>
      </Stack>

      <Box
        sx={{
          minHeight: '60vh',
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
                image={
                  currentStudio.logo
                    ? currentStudio.logo
                    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png'
                }
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
              Foundation year:{' '}
              {currentStudio.foundationYear
                ? currentStudio.foundationYear
                : 'Unknown'}
            </Typography>
            <Typography variant='body1' component='div'>
              Location:{' '}
              {currentStudio.location ? currentStudio.location : 'Unknown'}
            </Typography>
            <Typography variant='body1' component='div' sx={{ marginTop: 2 }}>
              Movies: {formattedMovies ? formattedMovies : 'Unknown'}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default StudiosItem;

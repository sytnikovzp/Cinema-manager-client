import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// =============================================
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// =============================================
import { useNavigate } from 'react-router-dom';
// =============================================
import { deleteStudio } from '../../store/slices/studiosSlice';
import { itemListStyle } from '../../services/styleService';

const StyledAvatar = styled(Avatar)({
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  img: {
    objectPosition: 'center top',
  },
});

function StudiosList({ studios }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const status = useSelector((state) => state.studiosList.status);

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState();

  useEffect(() => {
    if (status && status !== null) {
      setOpen(true);
      if (status.toLowerCase().includes('success')) {
        setSeverity('success');
      } else {
        return setSeverity('error');
      }
    }
  }, [status]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const onItemOpen = (id) => {
    navigate(`/studios/${id}`);
  };

  const onItemEdit = (event, id) => {
    event.stopPropagation();
    navigate(`/studios/new/${id}`);
  };

  const onItemDelete = (event, id) => {
    event.stopPropagation();
    dispatch(deleteStudio(id));
  };

  return (
    <>
      <Typography
        variant='h4'
        component='h2'
        sx={{ marginTop: -7, textAlign: 'left' }}
      >
        Studios list
      </Typography>

      <Box
        sx={{
          height: '60vh',
          overflowY: 'auto',
        }}
      >
        <List>
          {studios.map((studio) => (
            <Stack key={studio.id} direction='column' marginBottom={1}>
              <ListItem
                onClick={() => onItemOpen(studio.id)}
                disablePadding
                sx={itemListStyle}
                secondaryAction={
                  <Stack direction='row' spacing={1}>
                    <IconButton
                      edge='end'
                      aria-label='edit'
                      onClick={(event) => onItemEdit(event, studio.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={(event) => onItemDelete(event, studio.id)}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <StyledAvatar src={studio.logo} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${studio.title}, ${studio.foundationYear}, ${studio.location}`}
                  />
                </ListItemButton>
              </ListItem>
            </Stack>
          ))}
        </List>
      </Box>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          severity={severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {status}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default StudiosList;

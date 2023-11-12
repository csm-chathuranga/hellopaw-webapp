/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Grid,MenuItem,Select,TextField} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  create, update } from "../../../../services/petService";


const textProps = {
  id: "outlined-basic",
  variant: "outlined",
  fullWidth: true,
  InputLabelProps: {
    shrink: true,
  },
};

const schema = yup.object().shape({
  type: yup.string().required("First Name is required"),
  breed: yup.string().required("Breed is required"),
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

// eslint-disable-next-line react/prop-types
export default function CustomizedDialogs({open, setOpen, getMypetsHandler,selected}) {
  // const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, } = useForm({ resolver: yupResolver(schema), });

  let submitHandler = async (pet) => {
    if(selected) pet.id=selected.id;
    selected ? update(pet) : create(pet);
    getMypetsHandler();
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  React.useEffect(() => {
    if(Object.keys(selected).length>0){
      console.log(selected);
      setValue('type',selected?.type || null)
      setValue('breed',selected?.breed || null)
      setValue('birth_date',selected?.birth_date || null)
      setValue('color',selected?.color || null)
      setValue('gender',selected?.gender || null)
    }
   }, [selected]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add new pet
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <form onSubmit={handleSubmit(submitHandler)} id="hook-form">
        <Grid container direction="row">
          <Grid md={6} xs={12} sm={12}  sx={{p:2}}>
              <label style={{fontSize:'14px'}}>Type :</label>
              <TextField
                {...register("type")}
                error={errors?.type ? true : false}
                helperText={errors?.type ? errors.name.message : null}
                placeholder="Please Enter Type"
                {...textProps}
              />
            </Grid>

            <Grid md={6} xs={12} sm={12}  sx={{p:2}} >
              <label style={{fontSize:'14px'}}>Breed :</label>
              <TextField
                {...register("breed")}
                error={errors?.breed ? true : false}
                helperText={errors?.breed ? errors.breed.message : null}
                placeholder="Please Enter Breed"
                {...textProps}

              />
            </Grid>

            <Grid md={4} xs={12} sm={12} sx={{p:2}} >
              <label style={{fontSize:'14px'}}>Birth Date :</label>
              <TextField
                {...register("birth_date")}
                error={errors?.birth_date ? true : false}
                helperText={errors?.birth_date ? errors.birth_date.message : null}
                placeholder="Please Enter Birthdate"
                {...textProps}

              />
            </Grid>

            <Grid md={4} xs={12} sm={12} sx={{p:2}} >
              <label style={{fontSize:'14px'}}>Color :</label>
              <TextField
                {...register("color")}
                error={errors?.color ? true : false}
                helperText={errors?.color ? errors.color.message : null}
                placeholder="Please Enter Color"
                {...textProps}

              />
            </Grid>

            <Grid md={4} xs={12} sm={12} sx={{p:2}} >
            <label style={{fontSize:'14px'}}>Gender</label>
            <Select fullWidth={true} {...register("gender")} >  
              <MenuItem value={'male'} selected>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
              <MenuItem value={'other'}>Other</MenuItem>
            </Select>
            </Grid>

          </Grid>
          <Grid
            item
            md={12}
            display="flex"
            container
            direction="row"
            alignItems="right"
            justifyContent="right"
            sx={{
              p: 2,
            }}
          >
          <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
                padding: "5px 30px",
                fontSize: "16px",
                textTransform: "none",
                borderRadius: "8px",
              }}
            >
              Continue
            </Button>
            </Grid>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
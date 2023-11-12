import { confirmAlert } from 'react-confirm-alert';

export const deleteConfirm = (Callback) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          label: 'Yes',
          onClick:async () =>{
            return Callback(true)
          }
        },
        {
          label: 'No',
          onClick:async () =>{
            return Callback(false)
        }
        }
      ]
    });
  };
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress, IconButton } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { deleteAccountFilterSet } from '../../../../rest/api/AccountFilterApi';


export interface AccountFilterSetDeleteButtonProps {
    filterSetId: number;
    onDelete: () => void;
}

const AccountFilterSetDeleteButton = ({ filterSetId, onDelete }: AccountFilterSetDeleteButtonProps) => {

    const [loading, setLoading] = useState(false);

    return (
        <IconButton onClick={onClick}>
            {loading
                ? <CircularProgress size={20} color="primary" />
                : <DeleteIcon color="primary" />
            }
        </IconButton>
    );

    async function onClick() {
        setLoading(true)
        let response = await deleteAccountFilterSet(filterSetId);
        if (response.data != null)
            onDelete();
  
        setLoading(false);
    }
}

export default AccountFilterSetDeleteButton;
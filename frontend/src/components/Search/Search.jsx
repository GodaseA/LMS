import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
// import Books from "../../assets/Books_data"


export default function Search({Books}) {
    return (
        <Stack spacing={2} sx={{ width: 300 }}>

            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={Books.map((option) => option.title)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                type: 'search',
                            },
                        }}
                    />
                )}
            />
        </Stack>
    );
}

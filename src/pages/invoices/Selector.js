import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField } from "@mui/material";

import { InputWrapper, InputsGroup, Label, Select } from "../../components/FormControls/FormControlStyles";
import { fetchInvoice } from "../../reducers/invoiceSlices";
const StyledButton = styled.button`
    font-size: 20px;
    color: white;
    background-color: hsl(252deg 94% 67%);
    border: 0;
    border-radius: 4px;
    line-height: 2.55;
    font-weight: bold;
    cursor:pointer;
    &:hover{
        background-color:hsl(252deg 100% 73%);
    }
`;

export default function Selector() {
    /**
     * customers pull
     */
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        axios.get('/customerspullapi').then(res => {
            if (res.data && res.data.length !== 0) {
                setCustomers(res.data)
            }
        })
            .catch(e => {
                alert('QuickBooks connection error');
            })

    }, [setCustomers]);

    const [startDate, setStartDate] = useState(dayjs(new Date()));
    const [endDate, setEndDate] = useState(dayjs(new Date()));
    const [parentName, setParentName] = useState('');
    const dispatch = useDispatch();
    const invoiceView = () => {
        const startTime = dayjs(startDate).toDate();
        const endTime = dayjs(endDate).toDate();
        if (startTime > endTime) return;
        dispatch(fetchInvoice(({ parentName, startTime, endTime })));
    }
    return (
        <InputsGroup>
            <InputWrapper>
                <Label>Parent name:</Label>
                <Select
                    value={parentName}
                    onChange={e => {
                        setParentName(e.target.value);
                    }}
                    required
                >
                    <option value=""></option>
                    {customers.length !== 0 && (
                        customers.map((customer, key) => (
                            <option value={customer.DisplayName} key={customer.DisplayName}>{customer.DisplayName}</option>
                        ))
                    )}
                </Select>
            </InputWrapper>
            <InputWrapper>
                <Label>Start date:</Label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                        value={startDate}
                        onChange={newVal => {
                            setStartDate(newVal);
                        }}
                        onOpen={() => {
                        }}
                        onClose={() => {
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                sx={{
                                    '& .MuiInputBase-root': {
                                        color: 'white',
                                        fontFamily: "'Spartan',sans-serif",
                                        fontSize: '0.8rem',
                                        backgroundColor: 'hsl(233, 31%, 17%)'
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: ' hsl(233,30%,21%)',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline:focus': {
                                        borderColor: 'hsl(252,94%,67%)'
                                    }
                                }}
                            />}
                    />
                </LocalizationProvider>
            </InputWrapper>
            <InputWrapper>
                <Label>End date:</Label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                        value={endDate}
                        onChange={newVal => {
                            setEndDate(newVal);
                        }}
                        onOpen={() => {
                        }}
                        onClose={() => {
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                sx={{
                                    '& .MuiInputBase-root': {
                                        color: 'white',
                                        fontFamily: "'Spartan',sans-serif",
                                        fontSize: '0.8rem',
                                        backgroundColor: 'hsl(233, 31%, 17%)'
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: ' hsl(233,30%,21%)',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline:focus': {
                                        borderColor: 'hsl(252,94%,67%)'
                                    }
                                }}
                            />}
                    />
                </LocalizationProvider>
            </InputWrapper>
            <InputWrapper>
                <Label>Action:</Label>
                <StyledButton
                    onClick={invoiceView}
                >
                    View
                </StyledButton>
            </InputWrapper>

        </InputsGroup>
    )
}
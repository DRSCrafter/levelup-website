import React from 'react';
import {AppBar, Dialog, IconButton, Slider, Toolbar, Typography} from "@mui/material";
import SearchBar from "../searchBar";
import SideFilter from "../sideFilter";
import CheckBox from "../checkBox";
import RadioBox from "../radioBox";
import CloseIcon from "@mui/icons-material/Close";
import FilterDialogProps from "../../types/components/dialog/filterDialog";

function FilterDialog({
                          onClose, open, onCheckboxChange, radioValue, onRadioChange, maxPrice, onSubmitString,
                          range, onRangeChange, onPriceChange, string, onStringChange
                      }: FilterDialogProps) {
    const handleSearch = (string: string) => {
        onSubmitString(string);
        onClose();
    }

    return (
        <>
            <Dialog onClose={onClose} open={open} fullScreen>
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1, direction: "rtl"}} variant="h6" component="div">
                            فیلتر ها
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div style={{display: 'flex', flexDirection: 'column', rowGap: '20px'}}>
                    <SearchBar
                        placeholder="نام محصول را جستجو کنید"
                        isSideBar
                        value={string}
                        onChange={onStringChange}
                        onSubmit={() => handleSearch(string)}
                        isFilterDialog
                    />
                    <SideFilter label="برند ها">
                        <CheckBox label="Nintendo" onChanged={onCheckboxChange}/>
                        <CheckBox label="Microsoft" onChanged={onCheckboxChange}/>
                        <CheckBox label="Sony" onChanged={onCheckboxChange}/>
                        <CheckBox label="CD Projekt" onChanged={onCheckboxChange}/>
                    </SideFilter>
                    <SideFilter label="موجودی">
                        <RadioBox label="همه" onChange={onRadioChange} selectedValue={radioValue} value={"0"}/>
                        <RadioBox label="موجود" onChange={onRadioChange} selectedValue={radioValue} value={"1"}/>
                    </SideFilter>
                    <SideFilter label="محدوده قیمت" overFlowVisible>
                        <div style={{padding: 20}}>
                            <Slider
                                step={100000}
                                min={0}
                                max={maxPrice}
                                valueLabelDisplay="auto"
                                value={range}
                                onChange={onRangeChange}
                                onChangeCommitted={onPriceChange}
                            />
                        </div>
                    </SideFilter>
                </div>
            </Dialog>
        </>
    );
}

export default FilterDialog;
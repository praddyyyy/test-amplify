import React, { useState } from 'react'
import { Typography, AppBar, Toolbar, Tabs, Tab, Button, useMediaQuery, useTheme } from '@mui/material';
import DrawerComponent from './DrawerComponent';

const PAGES = ["Media Synthesis", "Comics", "Animation", "APIs", "Royalty", "Docs", "Pricing"]

const Header = () => {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <React.Fragment>
            <AppBar sx={{ backgroundColor: '#063970', position: 'relative' }}>
                <Toolbar>

                    {isMatch ? (
                        <>
                            <DrawerComponent />
                            <Typography sx={{ marginRight: '20px' }} >DreamikAI</Typography>
                        </>
                    ) : (
                        <>
                            <Typography sx={{ marginRight: '20px' }} >DreamikAI</Typography>
                            <Tabs textColor='inherit' value={value} onChange={(event, value) => { setValue(value) }} indicatorColor='primary' >
                                {PAGES.map((page, index) => (
                                    <Tab label={page} key={index} />
                                ))}
                            </Tabs>
                            <Button variant='contained' sx={{ marginLeft: 'auto}}' }}>Login</Button>
                            <Button variant='contained' sx={{ marginLeft: '20px' }} >Create Free Account</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Header
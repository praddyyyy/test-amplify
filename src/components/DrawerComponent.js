import React, { useState } from 'react'
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const PAGES = ["Media Synthesis", "Comics", "Animation", "APIs", "Royalty", "Docs", "Pricing", "Login", "Create Free Account"]

const DrawerComponent = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    return (
        <React.Fragment>
            <Drawer
                open={openDrawer}
                onClose={() => { setOpenDrawer(false) }}
            >
                <List>
                    {PAGES.map((page, index) => (
                        <ListItemButton onClick={() => setOpenDrawer()} key={index}>
                            <ListItemIcon>
                                <ListItemText>{page}</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <IconButton sx={{ color: '#fff' }} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </React.Fragment>
    )
}

export default DrawerComponent
import { Outlet, Link, useNavigate } from "react-router-dom"

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Layout = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    
    return (
        <main className="App">
            <div id="banner">
                <div id="banner-content">
                    UNCLASSIFIED
                </div>
            </div>

            <div id="app-header">
                <Link to="/"><h1>ProperT</h1></Link>
                <h4>Application developed by 1LT Adam Andre</h4>
            </div>

            <IconButton aria-label="back" onClick={goBack}>
                <ArrowBackIcon />
            </IconButton>
            <hr />

            <Outlet />
        </main>
    )
}

export default Layout
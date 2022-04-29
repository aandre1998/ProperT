import { Outlet, Link, useNavigate } from "react-router-dom"
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Layout = () => {
    /* The Layout component is used to create a template for all other components to fall into.
        This is done by using the Outlet from react-router-dom. */

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

            <div id="app-body">
                <Outlet />
            </div>

            <div id="app-footer">
                <hr />
            </div>
            
        </main>
    )
}

export default Layout
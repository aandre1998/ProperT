import { Link } from "react-router-dom";

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const UserPropertyBook = ({ data }) => {
    /* The UserPropertyBook component displays the property book with user features. */

    return (
        <section>
            <div className="app-apb">
                

                <Grid container spacing={2}>
                    {data.map(
                        (item) => (
                            <>
                                <Grid item xs={2} />

                                <Grid item xs={8}>
                                    <Paper className="apb-flex-container apb-hover-box" sx={{
                                        fontSize: '24px'
                                    }}>
                                        <span className="app-apb-left">
                                            <Link to={item.LIN} style={{ textDecoration: 'none', color: 'black' }}>{item.LIN} - {item.LIN_Description}</Link>
                                        </span>
                                    </Paper>
                                </Grid>

                                <Grid item xs={2} />
                            </>
                        )
                    )}
                </Grid>
            </div>
        </section>
    )
}

export default UserPropertyBook
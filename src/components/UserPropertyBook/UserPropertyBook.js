import { Link } from "react-router-dom";

const UserPropertyBook = ({ data }) => {

    return (
        <section>
            <h1>UserPropertyBook.js</h1>
            <ul>
                {data.map(
                    (item) => (
                            <li key={item.LIN}>
                                <Link to={item.LIN}>{item.LIN}</Link> - {item.LIN_Description}
                            </li>
                    )
                )}
            </ul>
        </section>
    )
}

export default UserPropertyBook
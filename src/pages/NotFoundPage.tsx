import React from 'react';
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div>
            <h1>
                Такой страницы не существует
            </h1>
            <Link to='/settings'>
                <button>Вернуться на главную страницу</button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
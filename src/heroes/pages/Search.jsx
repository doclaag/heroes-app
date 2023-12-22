import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from '../../hooks';
import { getHeroesByName } from '../helpers';
import { HeroCard } from '../components';

export const Search = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);
    const heroes = getHeroesByName(q);

    const showSearch = (q.length === 0);
    const showError = (q.length > 0) && heroes.length === 0;

    const { searchText, onInputChange } = useForm({
        searchText: q
    });

    const onSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`?q=${searchText}`);
    };

    const heroCards = heroes.map(hero => (
        <div className="col-sm-12 col-md-6 col-lg-4" key={hero.id}>
            <HeroCard {...hero} />
        </div>
    ));

    return (
        <>
            <h1>Search</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Searching</h4>
                    <hr />
                    <form onSubmit={onSearchSubmit} aria-label='form'>
                        <input
                            type="text"
                            placeholder="Search a hero"
                            className="form-control"
                            autoComplete="off"
                            name="searchText"
                            value={searchText}
                            onChange={onInputChange}
                        />
                        <button
                            type="submit"
                            className="btn mt-2 btn-block btn-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <div className="alert alert-primary animate__animated animate__fadeIn"
                                style={{ display: showSearch ? '' : 'none' }}>
                                Search a hero
                            </div>

                            <div aria-label="alert-danger" className="alert alert-danger animate__animated animate__fadeIn"
                                style={{ display: showError ? '' : 'none' }}>
                                No hero with <b>{q}</b>
                            </div>

                            <div className="row">
                                {heroCards}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
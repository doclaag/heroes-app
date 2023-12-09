import PropTypes from 'prop-types';

import { getHeroesByPublisher } from "../helpers";
import { HeroCard } from './';

export const HeroList = ({ publisher }) => {

    const heroes = getHeroesByPublisher(publisher);

    return (
        <>
            <div className="row rows-cols-1 row-cols-md-3 g-3">
                {
                    heroes.map(heroe => (
                        <HeroCard
                            key={heroe.id}
                            {...heroe}
                        />
                    ))
                }
            </div>
        </>
    );
};

HeroList.propTypes = {
    publisher: PropTypes.string.isRequired,
};
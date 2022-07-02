import { FC } from 'react';
import { Link } from 'react-router-dom';

interface CardInfo {
    title: string
    text: string
    link: string
}

interface TodayCardProps {
    item: CardInfo
}


const TodayCard: FC<TodayCardProps> = ({ item }) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-top">
                    <h4>
                        {item.title}
                    </h4>
                    <p>
                        {item.text}
                    </p>
                </div>
                <div className='card-bottom'>
                    <Link to={item.link}>
                        <button className='btn btn-primary'>
                            Оформить
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default TodayCard;
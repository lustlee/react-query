import { Col, Container, Row } from 'react-bootstrap';
import { CoinsTable } from './components/CoinsTable';
import axios from 'axios';
import { useQuery } from 'react-query';

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		'X-API-KEY': 'fNUklG+BQISL2ME2nbgcUBSdynmo5+CShTAPZERpZSE=',
	},
};

// TODO: Новый подход с React-query.
const fetchCoins = async () => {
	const { data } = await axios.get(
		'https://openapiv1.coinstats.app/coins?limit=10',
		options
	);

	return data.result;
};

// TODO: Более классический вариант, как бы мы делали запрос на сервер.
// const fetchCoins = async () => {
// 	try {
// 		const { data } = await axios.get(
// 			'https://openapiv1.coinstats.app/coins?limit=10',
// 			options
// 		);
// 		setCoins(data.coins);
// 	} catch (error) {
// 		setError(true);
// 	} finally {
// 		setLoading(false);
// 	}
// };

function App() {
	// TODO: Нам даже не нужны state для работы.
	// const [coins, setCoins] = useState([]);
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState(false);

	// TODO: Даже этот хук Эффекта нам не нужен.
	// useEffect(() => {
	// 	void fetchCoins();
	// }, []);

	//                                        Ключ запроса, Сама функция запроса
	const { isLoading, isError, data } = useQuery('coins', fetchCoins);

	if (isLoading) {
		return <h3>Loading ...</h3>;
	}

	if (isError) {
		return <h3>Error as Server Data</h3>;
	}

	if (!data) {
		return <h3>No data</h3>;
	}

	return (
		<>
			<Container className='d-flex align-items-center justify-content-center text-center not-found-container mt-5 '>
				<Row>
					<Col>
						<CoinsTable data={data} />
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default App;

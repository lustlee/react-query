import { Button, Col, Container, Row } from 'react-bootstrap';
import { CoinsTable } from './components/CoinsTable';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useState } from 'react';

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		'X-API-KEY': 'fNUklG+BQISL2ME2nbgcUBSdynmo5+CShTAPZERpZSE=',
	},
};

// TODO: Новый подход с React-query.
const fetchCoins = async (page: number) => {
	const { data } = await axios.get(
		`https://openapiv1.coinstats.app/coins?page=${page}&limit=10`,
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

	const [page, setPage] = useState(1);
	//                                        Ключ запроса, Сама функция запроса
	const { isLoading, isError, data } = useQuery(
		['coins', page],
		() => fetchCoins(page),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	);

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
			<Container className='d-flex align-items-center justify-content-center text-center not-found-container mt-5'>
				<Row>
					<CoinsTable data={data} />

					<Button
						onClick={() => setPage((p: number) => p - 1)}
						disabled={page === 1}
					>
						Prev
					</Button>
					<Button onClick={() => setPage((p: number) => p + 1)}>Next</Button>
				</Row>
			</Container>
		</>
	);
}

export default App;

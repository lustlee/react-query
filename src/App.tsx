import { Container } from 'react-bootstrap';
import { CoinsTable } from './components/CoinsTable';
import { DataCoins } from './constants';

function App() {
	return (
		<>
			<Container>
				LOLKEK
				<CoinsTable data={DataCoins} />
			</Container>
		</>
	);
}

export default App;

import { Container, Row } from 'react-bootstrap';
import { Coins } from './containers/Coins';
import { Products } from './containers/Products';

export const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		'X-API-KEY': 'fNUklG+BQISL2ME2nbgcUBSdynmo5+CShTAPZERpZSE=',
	},
};

function App() {
	return (
		<>
			<Container className='d-flex align-items-center justify-content-center text-center not-found-container mt-5'>
				<Row>
					{/* <Coins /> */}
					<Products />
				</Row>
			</Container>
		</>
	);
}

export default App;

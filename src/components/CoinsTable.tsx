import React from 'react';
import { Table } from 'react-bootstrap';

export const CoinsTable: React.FC = ({ data }) => {
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>№</th>
					<th>Name</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				{data &&
					data.map(obj => (
						<tr key={obj.id}>
							<td>{obj.rank}</td>
							<td>
								<img
									src={obj.icon}
									alt={obj.rank}
									width={20}
									style={{ marginRight: 10 }}
								/>
								{obj.name}
							</td>
							<td>$ {obj.price}</td>
						</tr>
					))}
			</tbody>
		</Table>
	);
};

import axios from 'axios';
import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CoinsTable } from '../components/CoinsTable';

const fetchProducts = async () => {
	return (await axios.get(`https://65c22871f7e6ea59682abe32.mockapi.io/items`))
		.data;
};

const createProduct = async data => {
	return await axios.post(
		`https://65c22871f7e6ea59682abe32.mockapi.io/items`,
		data
	);
};

export const Products: React.FC = () => {
	const queryClient = useQueryClient();
	const { data, isLoading, isError } = useQuery('products', fetchProducts);

	const mutation = useMutation(newProduct => createProduct(newProduct), {
		onSuccess: () => queryClient.invalidateQueries(['products']),
	});

	if (isLoading) {
		return <h3>Loading ...</h3>;
	}

	if (isError) {
		return <h3>Error as Server Data</h3>;
	}

	if (!data) {
		return <h3>No data</h3>;
	}

	const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const fields = Object.fromEntries(formData);

		mutation.mutate(fields);

		event.target.reset();
	};

	return (
		<Container style={{ marginTop: 30, maxWidth: 600 }}>
			<CoinsTable data={data} />

			<hr />

			<Form onSubmit={onSubmit}>
				<Form.Group className='mb-3'>
					<Form.Control name='name' type='text' placeholder='Name' />
				</Form.Group>

				<Form.Group className='mb-3'>
					<Form.Control name='price' type='number' placeholder='Price' />
				</Form.Group>

				<Button type='submit' variant='danger'>
					Add
				</Button>
			</Form>
		</Container>
	);
};

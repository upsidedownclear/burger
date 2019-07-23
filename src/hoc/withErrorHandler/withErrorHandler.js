import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import { existsTypeAnnotation } from '@babel/types';

const withErrorHandler = (WrappedComponet, axios) => {
	return (props) => {
		const [ error, setError ] = useState(null);

		const reqInterceptor = axios.interceptors.request.use((req) => {
			setError(null);
			return req;
		});

		const resInterceptor = axios.interceptors.response.use(
			(res) => res,
			(err) => {
				setError(err);
			}
		);

		const erroreConfirmedHandler = () => {
			setError(null);
		};

		useEffect(
			() => {
				return () => {
					axios.interceptors.request.eject(reqInterceptor);
					axios.interceptors.response.eject(resInterceptor);
				};
			},
			[ reqInterceptor, resInterceptor ]
		);
		return (
			<Aux>
				<Modal show={error} modalClosed={erroreConfirmedHandler}>
					<strong> Errore : </strong> <br />
					{error ? error.message : null}
				</Modal>
				<WrappedComponet {...props} />
			</Aux>
		);
	};
};

export default withErrorHandler;

import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import { existsTypeAnnotation } from '@babel/types';

const withErrorHandler = (WrappedComponet, axios) => {
	return class extends React.Component {
		state = {
			error: null
		};

		componentWillMount() {
			this.reqInterceptor = axios.interceptors.request.use((req) => {
				this.setState({ error: null });
				return req;
			});

			this.resInterceptor = axios.interceptors.response.use(
				(res) => res,
				(error) => {
					this.setState({ error: error });
				}
			);
		}

		erroreConfirmedHandler = () => {
			this.setState({ error: null });
		};

		componentWillUnmount() {
			// console.log('[Modal.js][withErrorHandler]', this.reqInterceptor, this.reqInterceptor);
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}

		render() {
			return (
				<Aux>
					<Modal show={this.state.error} modalClosed={this.erroreConfirmedHandler} show={this.state.error}>
						<strong> Errore : </strong> <br />
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponet {...this.props} />
				</Aux>
			);
		}
	};
};

export default withErrorHandler;

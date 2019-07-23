import React, { useState } from 'react';

import Aux from '../Aux/Aux';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
	const [ showSideDrawer, setShowSideDrawer ] = useState(false);

	const sideDrawerClosedHandler = () => {
		setShowSideDrawer(false);
	};

	const sideDrawerToggleHandler = () => {
		setShowSideDrawer(!showSideDrawer);
	};

	return (
		<Aux>
			<Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
			<SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
			<main className="Content">{props.children}</main>
		</Aux>
	);
};

export default Layout;

import React, { Suspense, lazy } from 'react';
import './styles.css';
// import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
// import Home from './screens/Home';
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

// import Stylists from './screens/Stylists/Stylists';
// import HairDesign from './screens/HairDesign/HairDesign';
// // import Contact from './screens/Contact/Contact';
// import Opportunities from './screens/Opportunities/Opportunities';
// import Testimonials from './screens/Testimonials/Testimonials';
// import Videos from './screens/Videos/Videos';
// import BarberServices from './screens/BarberServices/BarberServices';
// import Highlights from './screens/Highlights/Highlights';
// import Colors from './screens/Colors/Colors';

function App() {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route exact path="/about">
						<About />
					</Route>

					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</Suspense>
		</div>
	);
}

export default App;

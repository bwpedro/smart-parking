import React from 'react';
import { useParking } from 'context/parking';

const Logs: React.FC = () => {
	const { logs } = useParking();

	return (
		<div className="container">
			<div className="title">
				<h5>Logs</h5>
			</div>
			<div>
				{logs.map((log) => (
					<p key={log}>{log}</p>
				))}
			</div>
		</div>
	);
};

export default Logs;

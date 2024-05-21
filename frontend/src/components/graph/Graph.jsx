import { ResponsiveLine } from '@nivo/line';

export const Graph = ({ data }) => {
	return (
		<ResponsiveLine
			data={data}
			margin={{ top: 20, right: 25, bottom: 90, left: 28 }}
			xScale={{ type: 'point' }}
			yScale={{
				type: 'linear',
				min: 0,
				max: 10,
				stacked: false,
				reverse: false
			}}
			colors={{ datum: 'color' }}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize: 0,
				tickPadding: 25,
				tickRotation: 0,
				legend: '',
				legendOffset: 36,
				legendPosition: 'start',
				truncateTickAt: 0
			}}
			axisLeft={{
				tickSize: 0,
				tickPadding: 15,
				tickRotation: 0,
				legend: '',
				legendOffset: -40,
				legendPosition: 'middle',
				truncateTickAt: 0
			}}
			pointSize={7}
			pointBorderWidth={2}
			pointLabel="data.yFormatted"
			pointLabelYOffset={-12}
			useMesh={true}
			enableCrosshair={false}
			enableGridX={false}
			gridYValues={3}
		/>
	);
};

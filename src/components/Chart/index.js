import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";



const Chart = ({ data }) => {
    const CustomizedAxisTick = (props) => {
        const { x, y, payload } = props;
    
        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={-10}
                    dy={16}
                    textAnchor="end"
                    fill="#666"
                    transform="rotate(-50)"
                >
                    {payload.value}
                </text>
            </g>
        );
    };
    
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" height={60} tick={<CustomizedAxisTick />}/>
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart;
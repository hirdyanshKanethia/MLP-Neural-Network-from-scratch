import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';


const LossGraph = ({ data }) => {
  return (
    <div className="bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow border border-gray-200">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="epoch"
              tick={{ fill: '#6b7280' }}
              label={{
                value: 'Epoch',
                position: 'insideBottom',
                offset: -5,
                fill: '#6b7280',
              }}
            />
            <YAxis
              tick={{ fill: '#6b7280' }}
              label={{
                value: 'Loss',
                angle: -90,
                position: 'insideLeft',
                fill: '#6b7280',
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px',
              }}
              labelStyle={{
                color: '#1f2937',
                fontWeight: 'bold',
              }}
              itemStyle={{
                color: '#6366f1',
              }}
            />
            <Line
                type="monotone"
                dataKey="loss"
                stroke="#6366f1"
                strokeWidth={2}
                dot={true} // hides small dots entirely
                activeDot={true} // disables hover bubbles
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LossGraph;

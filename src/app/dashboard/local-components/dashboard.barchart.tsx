import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer } from 'recharts';
import { DashboardDataRuasType, DashboardDataType } from '../local-type/dashboard.type';

interface BarChartComponentProps {
    data: any;
}

interface TooltipProps {
    active?: boolean;
    payload?: any;
}

const CustomTooltip = (props: TooltipProps) => {
    const { active, payload } = props
    if (active && payload && payload.length) {
        const { ruasCount, ruasNames, unit } = payload[0].payload;
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
                <p>{`Unit: ${unit}`}</p>
                <p>{`Jumlah Ruas: ${ruasCount}`}</p>
                <p>Ruas:</p>
                <ul>
                    {ruasNames.map((name: string, index: number) => (
                        <li key={index}>{`- `}{name}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return null;
};

const BarChartComponent = (props: BarChartComponentProps) => {
    const { data } = props

    const ruasCount = data.map((unit: DashboardDataType) => ({
        id: unit.id,
        unit: unit.unit,
        ruasCount: unit.ruas.length,
        ruasNames: unit.ruas.map((ruas: DashboardDataRuasType) => ruas.ruas_name),
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart width={750} height={400} data={ruasCount} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="id"
                    tickFormatter={(value) => `Unit ${value}`}
                />
                <YAxis
                    allowDecimals={false}
                    label={{ value: "Jumlah Ruas", angle: -90, position: "insideLeft", offset: 0 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="ruasCount" fill="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
                <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;

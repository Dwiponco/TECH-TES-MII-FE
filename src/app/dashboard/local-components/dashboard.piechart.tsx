import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { DashboardDataRuasType, DashboardDataType } from '../local-type/dashboard.type';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF194F', '#1969FF', '#19FFA4', '#FF7019'];

interface PieChartComponentProps {
    data: DashboardDataType[];
}

interface TooltipProps {
    active?: boolean;
    payload?: any;
    label?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, value, unit } = payload[0].payload;
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
                <p>{`${name} (${value})`}</p>
                <p>{`Unit: ${unit}`}</p>
            </div>
        );
    }

    return null;
};

const PieChartComponent = (props: PieChartComponentProps) => {
    const { data } = props

    const pieData = data
        .flatMap((unit) =>
            unit.ruas.map((ruas: DashboardDataRuasType) => ({
                name: ruas.ruas_name,
                value: ruas.long || 0,
                unit: unit.unit,
            }))
        );

    return (
        <ResponsiveContainer width="100%" height={450}>
            <PieChart width={900} height={450}>
                <Pie
                    data={pieData}
                    cx={200}
                    cy={200}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ value }) => value}
                >
                    {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieChartComponent;

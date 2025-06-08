import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import '../style/chart.css';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const options: any = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#ffffff',
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.1)',
            },
        },
        y: {
            ticks: {
                color: '#ffffff',
                callback: function (value: number) {
                    return new Intl.NumberFormat('id-ID', {
                        maximumFractionDigits: 1,
                        notation: 'compact',
                        compactDisplay: 'short'
                    }).format(value);
                },
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.1)',
            },
        },
    },
};

export default function MoodChart() {
    const { dataweek } = useData();
    const [visibility, setVisibility] = useState([true, true]);

    const { labels, income, expanse } = useMemo(() => {
        if (!dataweek) return { labels: [], income: [], expanse: [] };

        const days = dataweek.map(dt => dt.date.split(" ")[0]);
        const incomeData = dataweek.map(dt => dt.income);
        const expanseData = dataweek.map(dt => dt.expanse);

        return {
            labels: days,
            income: incomeData,
            expanse: expanseData
        };
    }, [dataweek]);

    const baseDatasets = [
        { label: 'income', data: income, borderColor: '#00ffff' },
        { label: 'expanse', data: expanse, borderColor: '#ff7f7f' },
    ];

    const datasets = baseDatasets.map((ds, i) => ({
        ...ds,
        hidden: !visibility[i]
    }));

    const data = { labels, datasets };

    return (
        <div>
            <Line data={data} options={options} />
            <div style={{ marginTop: 10, display: 'flex', marginBottom: '1rem' }}>
                {baseDatasets.map((ds, i) => (
                    <div className='inria-sans-light xl groub-checkbox-chart' key={i} style={{ marginRight: 12 }}>
                        <input
                            className='checkbox-chart'
                            id={ds.label}
                            type="checkbox"
                            checked={visibility[i]}
                            onChange={() =>
                                setVisibility(vis => {
                                    const copy = [...vis];
                                    copy[i] = !copy[i];
                                    return copy;
                                })
                            }
                        />
                        <label htmlFor={ds.label}>{ds.label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

import type {
    ChartOptions,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import '../style/chart.css';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Dataset {
    label: string;
    data: number[];
    borderColor: string;
    hidden?: boolean;
}

const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
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
                callback(value: number | string) {
                    return new Intl.NumberFormat('id-ID', {
                        maximumFractionDigits: 1,
                        notation: 'compact',
                        compactDisplay: 'short',
                    }).format(Number(value));
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
    const [visibility, setVisibility] = useState<[boolean, boolean]>([true, true]);

    const { labels, income, expanse } = useMemo(() => {
        if (!dataweek || dataweek.length === 0) return { labels: [], income: [], expanse: [] };

        const days = dataweek.map((dt) => dt.date.split(' ')[0]);
        const incomeData = dataweek.map((dt) => dt.income);
        const expanseData = dataweek.map((dt) => dt.expanse);

        return { labels: days, income: incomeData, expanse: expanseData };
    }, [dataweek]);

    const baseDatasets: Dataset[] = useMemo(() => [
        {
            label: 'Income',
            data: income,
            borderColor: '#00ffff',
        },
        {
            label: 'Expanse',
            data: expanse,
            borderColor: '#ff7f7f',
        },
    ], [income, expanse]);

    const datasets: Dataset[] = baseDatasets.map((ds, i) => ({
        ...ds,
        hidden: !visibility[i],
    }));

    const chartData: ChartData<'line'> = {
        labels,
        datasets,
    };

    return (
        <div className="chart-wrapper">
            {labels.length > 0 ? (
                <>
                    <Line data={chartData} options={chartOptions} />
                    <div className="inria-sans-light xl chart-checkbox-container">
                        {baseDatasets.map((ds, i) => (
                            <div key={i} className="groub-checkbox-chart">
                                <input
                                    id={ds.label}
                                    type="checkbox"
                                    className="checkbox-chart"
                                    checked={visibility[i]}
                                    onChange={() =>
                                        setVisibility((prev) => {
                                            const next = [...prev] as [boolean, boolean];
                                            next[i] = !prev[i];
                                            return next;
                                        })
                                    }
                                />
                                <label htmlFor={ds.label} style={{ color: ds.borderColor }}>
                                    {ds.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p className="inria-sans-regular xl" style={{ color: 'white', textAlign: 'center' }}>
                    Tidak ada data minggu ini
                </p>
            )}
        </div>
    );
}

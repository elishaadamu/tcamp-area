"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from "recharts";
import {
  safetyData,
  phedData,
  ttiData,
  commuteData,
  ptiData,
  tttrData,
  tripLengthData,
  minorityData,
  povertyData,
  elderlyData
} from "./charts/data";

export type ChartType = "safety" | "phed" | "tti" | "commute" | "pti" | "tttr" | "tripLength" | "minority" | "poverty" | "elderly";

interface ChartWidgetProps {
  type: ChartType;
}

export default function ChartWidget({ type }: ChartWidgetProps) {
  const renderChart = () => {
    const commonXAxis = <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />;
    const commonYAxis = <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />;
    const commonTooltip = (
      <Tooltip 
        contentStyle={{ 
          backgroundColor: 'rgba(15, 23, 42, 0.95)', 
          borderRadius: '12px', 
          border: '1px solid rgba(255,255,255,0.1)', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          color: '#f8fafc'
        }}
        itemStyle={{ color: '#f8fafc' }}
      />
    );
    const commonCartesian = <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />;

    switch (type) {
      case "safety":
        return (
          <BarChart data={safetyData}>
            {commonCartesian}
            {commonXAxis}
            {commonYAxis}
            {commonTooltip}
            <Legend verticalAlign="top" height={50} iconType="circle" wrapperStyle={{ paddingTop: '20px', color: '#cbd5e1' }} />
            <Bar dataKey="Fatalities" fill="#facc15" radius={[6, 6, 0, 0]} barSize={20} />
            <Bar dataKey="nm_fsi" name="Non-Motorized FSI" fill="#2dd4bf" radius={[6, 6, 0, 0]} barSize={20} />
          </BarChart>
        );
      case "phed":
        return (
          <LineChart data={phedData}>
            {commonCartesian}
            {commonXAxis}
            {commonYAxis}
            {commonTooltip}
            <Legend verticalAlign="top" height={50} wrapperStyle={{ color: '#cbd5e1' }} />
            <Line type="monotone" dataKey="PHED" stroke="#facc15" strokeWidth={4} dot={{ r: 6, fill: '#facc15', strokeWidth: 0 }} activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }} />
          </LineChart>
        );
      case "tti":
      case "pti":
        const data = type === "tti" ? ttiData : ptiData;
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorYellow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#facc15" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTeal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
              </linearGradient>
            </defs>
            {commonCartesian}
            {commonXAxis}
            {commonYAxis}
            {commonTooltip}
            <Legend verticalAlign="top" height={50} wrapperStyle={{ color: '#cbd5e1' }} />
            <Area type="monotone" dataKey="AM" stroke="#facc15" strokeWidth={3} fillOpacity={1} fill="url(#colorYellow)" />
            <Area type="monotone" dataKey="PM" stroke="#2dd4bf" strokeWidth={3} fillOpacity={1} fill="url(#colorTeal)" />
          </AreaChart>
        );
      case "commute":
        return (
          <LineChart data={commuteData}>
            {commonCartesian}
            {commonXAxis}
            {commonYAxis}
            {commonTooltip}
            <Legend verticalAlign="top" height={50} wrapperStyle={{ color: '#cbd5e1' }} />
            <Line type="monotone" dataKey="Petersburg" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Chesterfield" stroke="#facc15" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="MPO" stroke="#2dd4bf" strokeWidth={3} strokeDasharray="8 4" dot={false} />
          </LineChart>
        );
      case "tttr":
        return (
          <BarChart data={tttrData}>
            {commonCartesian}
            {commonXAxis}
            {commonYAxis}
            {commonTooltip}
            <Legend verticalAlign="top" height={50} wrapperStyle={{ color: '#cbd5e1' }} />
            <Bar dataKey="AM" fill="#facc15" radius={[4, 4, 0, 0]} />
            <Bar dataKey="PM" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Midday" fill="#475569" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case "tripLength":
        const filteredTripData = tripLengthData.filter(d => d.name === "Chesterfield" || d.name === "Petersburg");
        return (
          <LineChart data={filteredTripData}>
            {commonCartesian}
            {commonXAxis}
            {commonYAxis}
            {commonTooltip}
            <Legend verticalAlign="top" height={50} wrapperStyle={{ color: '#cbd5e1' }} />
            <Line type="monotone" dataKey="overall" name="Overall Trip Length" stroke="#facc15" strokeWidth={4} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="PT" name="Public Transit" stroke="#2dd4bf" strokeWidth={3} />
          </LineChart>
        );
      case "minority":
        return (
          <BarChart data={minorityData}>
            {commonCartesian}
            {commonXAxis}
            {commonYAxis}
            {commonTooltip}
            <Legend verticalAlign="top" height={50} wrapperStyle={{ color: '#cbd5e1' }} />
            <Bar dataKey="Petersburg" fill="#facc15" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Hopewell" fill="#2dd4bf" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Regional" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        );
      case "poverty":
        return (
          <AreaChart data={povertyData}>
            <defs>
              <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            {commonCartesian}
            {commonXAxis}
            {commonYAxis}
            {commonTooltip}
            <Legend verticalAlign="top" height={50} wrapperStyle={{ color: '#cbd5e1' }} />
            <Area type="monotone" dataKey="Petersburg" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorRed)" />
            <Area type="monotone" dataKey="Regional" stroke="#3b82f6" strokeWidth={2} fill="transparent" strokeDasharray="8 4" />
          </AreaChart>
        );
      case "elderly":
        const elderlyColors = ["#facc15", "#2dd4bf", "#f59e0b", "#ef4444", "#3b82f6"];
        return (
          <LineChart data={elderlyData}>
            {commonCartesian}
            {commonXAxis}
            {commonYAxis}
            {commonTooltip}
            <Legend verticalAlign="top" height={50} wrapperStyle={{ color: '#cbd5e1' }} />
            <Line type="monotone" dataKey="Petersburg" stroke={elderlyColors[0]} strokeWidth={3} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="Hopewell" stroke={elderlyColors[1]} strokeWidth={3} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="Prince George" stroke={elderlyColors[2]} strokeWidth={3} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="Regional" stroke={elderlyColors[4]} strokeWidth={4} strokeDasharray="8 4" dot={false} />
          </LineChart>
        );
      default:
        return <div className="text-gray-500 italic">Analysis coming soon...</div>;
    }
  };

  return (
    <div className="w-full h-full p-10 bg-gray-900 flex flex-col items-center justify-center transition-all">
        <div className="mb-10 text-center">
          <h4 className="text-2xl font-heading font-black text-white mb-2 uppercase tracking-[0.2em]">
              {type.replace(/([A-Z])/g, ' $1').trim()} Analysis
          </h4>
          <p className="text-xs text-gray-500 font-heading font-bold uppercase tracking-widest opacity-60">Regional Performance Trends</p>
        </div>
        <div className="w-full h-[350px] md:h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
               {renderChart()}
            </ResponsiveContainer>
        </div>
        <div className="mt-12 text-sm text-gray-500 font-body max-w-lg text-center leading-relaxed">
            Data sourced from current regional indicators and census block group analysis for the four-county area.
        </div>
    </div>
  );
}

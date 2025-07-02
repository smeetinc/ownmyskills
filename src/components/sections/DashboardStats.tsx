"use client";

interface Props {
  totalProjects: number;
  totalValue: number;
  skillCount: number;
  averageValue: number;
}

export default function DashboardStats({
  totalProjects,
  totalValue,
  skillCount,
  averageValue,
}: Props) {
  return (
    <div className="mt-8 bg-white rounded-lg p-6">
      <h5 className="font-bold text-lg mb-4">Portfolio Statistics</h5>
      <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-2xl font-bold text-purple-600">{totalProjects}</p>
          <p className="text-sm text-gray-600">Total Projects</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600">
            {totalValue.toFixed(1)} FLOW
          </p>
          <p className="text-sm text-gray-600">Total Value</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-600">{skillCount}</p>
          <p className="text-sm text-gray-600">Skills Used</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-orange-600">
            {averageValue.toFixed(2)} FLOW
          </p>
          <p className="text-sm text-gray-600">Avg. Project Value</p>
        </div>
      </div>
    </div>
  );
}

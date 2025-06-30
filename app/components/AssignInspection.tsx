// components/AssignInspection.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Criteria = { _id: string; name: string };

interface AssignInspectionProps {
  params: { carId: string };
}

export default function AssignInspection({ params }: AssignInspectionProps) {
  const [criteriaList, setCriteriaList] = useState<Criteria[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/criteria')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch criteria');
        return res.json() as Promise<Criteria[]>;
      })
      .then(setCriteriaList)
      .catch((error) => {
        console.error('Error fetching criteria:', error);
        alert('Lỗi khi tải danh sách tiêu chí');
      });
  }, []);

  const toggleCriteria = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((cid) => cid !== id)
        : prev.length < 5
        ? [...prev, id]
        : prev
    );
  };

  const assignToCar = async () => {
    try {
      const res = await fetch(`/api/cars/${params.carId}`, {
        method: 'POST',
        body: JSON.stringify({ criteriaIds: selected }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const error = await res.json();
        alert(`Lỗi: ${error.error || 'Không thể gán tiêu chí'}`);
        return;
      }
      router.push(`/inspect/${params.carId}`);
    } catch (error) {
      console.error('Error assigning criteria:', error);
      alert('Lỗi hệ thống khi gán tiêu chí');
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Chọn tiêu chí kiểm tra (tối đa 5)</h1>
      <ul className="space-y-2">
        {criteriaList.map((cri) => (
          <li key={cri._id}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={cri._id}
                checked={selected.includes(cri._id)}
                onChange={() => toggleCriteria(cri._id)}
                disabled={!selected.includes(cri._id) && selected.length >= 5}
              />
              <span>{cri.name}</span>
            </label>
          </li>
        ))}
      </ul>
      <button
        disabled={selected.length === 0}
        onClick={assignToCar}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        Tiến hành kiểm tra
      </button>
    </main>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Button from '@/app/components/ui/Button'; 

type Criteria = { _id: string; name: string };

export default function AssignPage() {
  const { carId } = useParams();
  const [criteriaList, setCriteriaList] = useState<Criteria[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
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
    if (!carId) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/cars/${carId}`, {
        method: 'POST',
        body: JSON.stringify({ criteriaIds: selected }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Lỗi: ${error.error || 'Không thể gán tiêu chí'}`);
        return;
      }

      router.push(`/inspect/${carId}`);
    } catch (error) {
      console.error('Error assigning criteria:', error);
      alert('Lỗi hệ thống khi gán tiêu chí');
    } finally {
      setLoading(false);
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

      <div className="mt-6 flex gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          ← Quay lại
        </Button>

        <Button
          variant="secondary"
          onClick={assignToCar}
          disabled={selected.length === 0}
          loading={loading}
        >
          Tiến hành kiểm tra
        </Button>
      </div>
    </main>
  );
}

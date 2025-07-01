'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Criteria = {
  _id: string;
  name: string;
};

export default function InspectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [criteriaList, setCriteriaList] = useState<Criteria[]>([]);
  const [form, setForm] = useState<
    { criteriaId: string; is_good: boolean; note?: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  if (!id) return null;

  useEffect(() => {
    fetch('/api/criteria')
      .then((res) => res.json())
      .then((data: Criteria[]) => {
        const limited = data.slice(0, 5);
        setCriteriaList(limited);
        setForm(limited.map((c) => ({ criteriaId: c._id, is_good: true })));
      });
  }, []);

  const handleChange = (index: number, is_good: boolean) => {
    setForm((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, is_good, note: is_good ? undefined : item.note || '' } : item
      )
    );
  };

  const handleNoteChange = (index: number, value: string) => {
    setForm((prev) =>
      prev.map((item, i) => (i === index ? { ...item, note: value } : item))
    );
  };

  const handleSubmit = async () => {
    for (const item of form) {
      if (!item.is_good && !item.note?.trim()) {
        alert('Vui lòng nhập lý do với tiêu chí không đạt.');
        return;
      }
    }

    setLoading(true);
    const res = await fetch(`/api/cars/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inspection: form }),
    });

    if (res.ok) {
      alert('Kiểm định thành công!');
      router.push('/');
    } else {
      alert('Lỗi kiểm định.');
    }
    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Kiểm định xe</h1>

      <ul className="space-y-6">
        {criteriaList.map((item, index) => (
          <li key={item._id} className="border rounded-xl p-4">
            <p className="font-medium">{item.name}</p>
            <div className="flex gap-4 mt-2">
              <label>
                <input
                  type="radio"
                  checked={form[index]?.is_good === true}
                  onChange={() => handleChange(index, true)}
                />{' '}
                Đạt
              </label>
              <label>
                <input
                  type="radio"
                  checked={form[index]?.is_good === false}
                  onChange={() => handleChange(index, false)}
                />{' '}
                Không đạt
              </label>
            </div>

            {form[index]?.is_good === false && (
              <textarea
                placeholder="Nhập lý do không đạt"
                className="mt-2 w-full p-2 border rounded"
                value={form[index].note || ''}
                onChange={(e) => handleNoteChange(index, e.target.value)}
              />
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? 'Đang xử lý...' : 'Hoàn tất kiểm định'}
      </button>
    </main>
  );
}

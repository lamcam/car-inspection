"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";

type Car = {
  _id: string;
  name: string;
  status: number;
};

const statusText = ["Chưa kiểm tra", "Đang kiểm tra", "Đã kiểm tra"];
const statusColor = ["text-gray-600", "text-yellow-600", "text-green-600"];
const buttonText = ["Bắt đầu kiểm tra", "Tiếp tục kiểm tra", "Đã kiểm tra"];

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .finally(() => setIsLoading(false));
  }, []);

  const handleClick = (car: Car) => {
    if (car.status === 0) router.push(`/assign/${car._id}`);
    else if (car.status === 1) router.push(`/inspect/${car._id}`);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Danh sách xe</h1>

      {isLoading ? (
        <div className="text-blue-600 animate-pulse text-center mt-10">
          🏎️ Xe đang được load để kiểm tra... Vui lòng đợi!
        </div>
      ) : cars.length === 0 ? (
        <p className="text-gray-500">Không có xe nào.</p>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4">
            Số lượng: {cars.length} xe
          </p>
          <ul className="space-y-4">
            {cars.map((car) => (
              <li
                key={car._id}
                className="border rounded-xl p-4 shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-medium">{car.name}</p>
                  <p className={`text-sm ${statusColor[car.status]}`}>
                    Trạng thái: {statusText[car.status]}
                  </p>
                </div>

                <Button
                  onClick={() => handleClick(car)}
                  disabled={car.status === 2}
                  variant={
                    car.status === 2
                      ? "outline"
                      : car.status === 1
                      ? "resume"
                      : "start"
                  }
                >
                  {buttonText[car.status]}
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

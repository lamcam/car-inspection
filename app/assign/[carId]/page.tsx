// app/assign/[carId]/page.tsx
import AssignInspection from '../../components/AssignInspection';

interface AssignInspectionProps {
  params: Promise<{ carId: string }>;
}

export default async function AssignPage({ params }: AssignInspectionProps) {
  const { carId } = await params;
  return <AssignInspection params={{ carId }} />;
}
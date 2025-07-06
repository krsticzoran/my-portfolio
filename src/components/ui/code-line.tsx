interface CodeLineProps {
  label: string;
  value: string;
}

export default function CodeLine({ label, value }: CodeLineProps) {
  return (
    <div className="pl-6">
      <span className="text-zinc-300 mr-1">{label}:</span>
      <span className="text-gray-400">&apos;</span>
      <span className="text-green-400">{value}</span>
      <span className="text-gray-500 dark:text-gray-400">&apos;,</span>
    </div>
  );
}

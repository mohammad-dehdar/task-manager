import type { TasksByStatus } from '../types';

interface TasksByStatusProps {
  data: TasksByStatus;
}

const STATUS_CONFIG = [
  { key: 'todo' as const, label: 'To Do', color: 'bg-neutral-400' },
  { key: 'in-progress' as const, label: 'In Progress', color: 'bg-info-500' },
  { key: 'done' as const, label: 'Done', color: 'bg-success-500' },
];

export function TasksByStatusChart({ data }: TasksByStatusProps) {
  const total = data.todo + data['in-progress'] + data.done;

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-neutral-800 mb-4">Tasks by Status</h3>

      {total === 0 ? (
        <p className="text-sm text-neutral-500">No tasks yet</p>
      ) : (
        <>
          <div className="flex h-3 w-full overflow-hidden rounded-full mb-4">
            {STATUS_CONFIG.map((s) => {
              const pct = total > 0 ? (data[s.key] / total) * 100 : 0;
              return pct > 0 ? (
                <div
                  key={s.key}
                  className={s.color}
                  style={{ width: `${pct}%` }}
                  title={`${s.label}: ${data[s.key]}`}
                />
              ) : null;
            })}
          </div>

          <div className="flex flex-col gap-2">
            {STATUS_CONFIG.map((s) => (
              <div key={s.key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
                  <span className="text-sm text-neutral-600">{s.label}</span>
                </div>
                <span className="text-sm font-medium text-neutral-800">{data[s.key]}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

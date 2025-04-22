export default function RecentActivity ({ activities }){
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
          <div className="flex-shrink-0 mt-1">
            <div className={`h-2 w-2 rounded-full ${activity.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
            <p className="text-sm text-gray-500">{activity.description}</p>
            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
    
}
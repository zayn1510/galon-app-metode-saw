type DetailRowProps = {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
  };
  
  const DetailRow: React.FC<DetailRowProps> = ({ icon, label, value }) => (
    <div className="flex items-start p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 mr-4 shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <div className="text-base font-normal text-gray-800">
          {value}
        </div>
      </div>
    </div>
  );
  export default DetailRow;
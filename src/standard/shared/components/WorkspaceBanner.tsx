// src/standard/shared/components/WorkspaceBanner.tsx
const WorkspaceBanner = () => {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-indigo-100 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-indigo-900">Standard Workspace</h2>
                    <p className="text-sm text-indigo-700">Welcome to your contract management dashboard.</p>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceBanner;

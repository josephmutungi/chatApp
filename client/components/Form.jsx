export default function Form({ onSubmit, children, title, description }) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md mx-auto bg-white shadow-xl shadow-gray-200/50 rounded-3xl p-8 border border-gray-100"
    >
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-gray-500 mt-2">{description}</p>}
      </div>
      <div className="space-y-5">{children}</div>
    </form>
  );
}

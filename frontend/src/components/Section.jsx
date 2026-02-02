export default function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {children}
      </div>
    </section>
  );
}

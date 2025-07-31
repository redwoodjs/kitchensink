export function PageLinks() {
  return (
    <div className="flex flex-row gap-2 justify-center">
      <a href="/nav/page-1" className="text-blue-500">
        Page 1
      </a>
      <a href="/nav/page-2" className="text-blue-500">
        Page 2
      </a>
      <a href="/nav/page-3" className="text-blue-500">
        Page 3 (404)
      </a>
    </div>
  );
}

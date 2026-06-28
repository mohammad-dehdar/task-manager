export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-6 px-13">
      <p className="text-sm text-neutral-500 text-center">
        &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
      </p>
    </footer>
  );
}

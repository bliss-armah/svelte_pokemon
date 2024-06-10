// place files you want to import through the `$lib` alias in this folder.
// debounce.ts
export function debounce(func: Function, wait: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  